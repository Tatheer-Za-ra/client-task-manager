"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Task,TaskStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";



interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
  onSaved: () => void;
}


export function TaskForm({ task, onClose, onSaved }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState(task?.status || "pending");
  const [dueDate, setDueDate] = useState(
    task?.due_date ? task.due_date.split("T")[0] : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setError("Failed to verify session");
        setLoading(false);
        return;
      }

      if (!sessionData?.session?.user?.id) {
        setError("Not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
        user_id: sessionData.session.user.id,
      };

      if (task) {
        const { error: updateError } = await supabase
          .from("tasks")
          .update(taskData)
          .eq("id", task.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("tasks")
          .insert([taskData]);

        if (insertError) throw insertError;
      }

      onSaved();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save task";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>{task ? "Edit Task" : "Create New Task"}</CardTitle>
          <CardDescription>
            {task ? "Update your task details" : "Add a new task to your list"}
          </CardDescription>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
<Select
  value={status}
  onValueChange={(value) => setStatus(value as TaskStatus)}
  disabled={loading}
>                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
