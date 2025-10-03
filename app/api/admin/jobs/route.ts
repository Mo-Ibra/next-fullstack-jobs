import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Create a new job
// POST /api/admin/jobs
export async function POST(request: Request) {
  const session = await getServerSession();

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
