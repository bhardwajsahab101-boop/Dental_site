import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { Appointment } from "../../../../models/Appointment";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // In Next.js 15+ and 16, params is a Promise and must be awaited
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment ID is required",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    // Validate incoming status
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid status. Status must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Update appointment status and return the new document
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment status updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    console.error("PATCH appointment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update status",
      },
      { status: 500 }
    );
  }
}
