
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskList } from "@/components/task-list";


async function ProtectedContent() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

   return <TaskList userId={user.id} />;

}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <ProtectedContent />
    </Suspense>
  );
}