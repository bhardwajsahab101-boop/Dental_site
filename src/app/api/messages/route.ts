import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../lib/mongodb";
import { ContactMessage } from "../../../models/ContactMessage";
import { verifyJWT } from "../../../lib/auth";

// Secure helper to verify admin session
async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const secret = process.env.JWT_SECRET;
    
    if (!token || !secret) {
      return false;
    }

    const verified = await verifyJWT(token, secret);
    return !!verified;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    // Build DB filter query
    const filter: Record<string, unknown> = {};

    if (status && ["unread", "read", "replied"].includes(status)) {
      filter.status = status;
    }

    if (query) {
      filter.$or = [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { message: { $regex: query, $options: "i" } },
      ];
    }

    const messages = await ContactMessage.find(filter as any).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !["unread", "read", "replied"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status. Must be unread, read, or replied." },
        { status: 400 }
      );
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Message status updated successfully",
      updatedMessage,
    });
  } catch (error) {
    console.error("PATCH message error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });
    }

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE message error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 }
    );
  }
}
