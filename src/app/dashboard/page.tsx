import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <ProfileHeader />
      </div>

      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="mb-8">
        <AddTaskForm />
      </div>

      <TaskList />
    </div>
  );
}
