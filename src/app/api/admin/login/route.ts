import { NextResponse } from "next/server";
import { signJWT } from "../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminEmail || !adminPassword || !jwtSecret) {
      console.error("Missing environment variables: ADMIN_EMAIL, ADMIN_PASSWORD, or JWT_SECRET");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Contact administrator.",
        },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Compare credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Generate JWT token (expires in 24 hours)
    const token = await signJWT({ email }, jwtSecret, 86400);

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });

    // Set HTTP-only secure cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred",
      },
      { status: 500 }
    );
  }
}
