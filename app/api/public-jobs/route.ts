// app/api/public-jobs/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.company ||
      !body.location ||
      !body.work_location_type||
      !body.job_type||
      !body.description ||
      !body.application_link
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure status is pending for public submissions
    const jobData = {
      ...body,
      status: "pending",
    };

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert([jobData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
