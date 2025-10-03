import { supabase, supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * Updates a job by its ID.
 * 
 * @param request The Next.js request object
 * @param params The params object containing the job ID
 * @returns A NextResponse object with the updated job
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("jobs")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Initial Server Error, Please try again" },
      { status: 500 }
    );
  }
}

/**
 * Deletes a job by its ID.
 *
 * @param request The Next.js request object
 * @param params The params object containing the job ID
 * @returns A NextResponse object with the deletion result
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { error } = await supabaseAdmin.from("jobs").delete().eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Initial Server Error, Please try again" },
      { status: 500 }
    );
  }
}
