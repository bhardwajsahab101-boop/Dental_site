import { NextResponse } from "next/server";

import { connectDB } from "../../../lib/mongodb";
import { Appointment } from "../../../models/Appointment";

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
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}