import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      Hello In Admin...
    </div>
  )
}
