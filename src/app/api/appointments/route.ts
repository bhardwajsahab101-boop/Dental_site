import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Appointment } from "../../../models/Appointment";

export async function GET() {
  try {
    await connectDB();

    // Fetch all appointments and sort by newest first (by createdAt date)
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("GET appointments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch appointments",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const appointment = await Appointment.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST appointments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}