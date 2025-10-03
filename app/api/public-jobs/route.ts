// app/api/public-jobs/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.company ||
      !body.location ||
      !body.description ||
      !body.job_type
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

    const { data, error } = await supabase
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
