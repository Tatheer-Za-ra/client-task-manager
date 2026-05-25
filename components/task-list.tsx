"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import { TaskForm } from "./task-form";
import type { Task, TaskStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface Task {
//   id: string;
//   user_id: string;
//   title: string;
//   description: string | null;
//   status: TaskStatus;
//   due_date: string | null;
//   created_at: string;
// }

// type TaskStatus = "pending" | "in_progress" | "completed";

type TaskListProps = {
  userId: string;
};

export function TaskList({ userId }: TaskListProps) {
  const supabase = useMemo(() => createClient(), []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(`Failed to load tasks: ${fetchError.message}`);
        setTasks([]);
        return;
      }

      setTasks((data as Task[]) || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [supabase, userId, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function deleteTask(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (deleteError) {
        setError(`Failed to delete task: ${deleteError.message}`);
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
    }
  }

  function openCreateForm() {
    setSelectedTask(null);
    setIsFormOpen(true);
  }

  function openEditForm(task: Task) {
    setSelectedTask(task);
    setIsFormOpen(true);
  }

  function handleFormClose() {
    setIsFormOpen(false);
    setSelectedTask(null);
  }

  function handleTaskSaved() {
    handleFormClose();
    fetchTasks();
  }

  function getStatusColor(status: TaskStatus) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusLabel(status: string) {
    return status.replace("_", " ");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by status:</span>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as TaskStatus | "all")
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={openCreateForm}>Create Task</Button>
      </div>

      {error && (
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          task={selectedTask}
          onClose={handleFormClose}
          onSaved={handleTaskSaved}
        />
      )}

      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="rounded-lg border border-dashed py-12 text-center text-gray-500">
          No tasks found. Create one to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="w-full flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{task.title}</h3>

                    <span
                      className={`rounded px-2 py-1 text-xs capitalize ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {getStatusLabel(task.status)}
                    </span>
                  </div>

                  {task.description && (
                    <p className="mb-2 text-sm text-gray-600">
                      {task.description}
                    </p>
                  )}

                  {task.due_date && (
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(task)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="flex-1 text-red-600 hover:text-red-700 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}