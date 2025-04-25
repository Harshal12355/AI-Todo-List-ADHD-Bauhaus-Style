
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import TaskItem, { Task } from "@/components/TaskItem";

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        subtasks: [],
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      toast({
        title: "Task added",
        description: "Your task has been successfully added.",
      });
    }
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been removed.",
    });
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <MainLayout>
      <div className="bauhaus-container">
        <div className="container max-w-3xl">
          <h1 className="bauhaus-header mb-8">My Tasks</h1>
          
          {totalTasksCount > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-bauhaus-gray">
                  {completedTasksCount} of {totalTasksCount} tasks completed
                </span>
                <span className="font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-bauhaus-background">
                <div 
                  className="h-full bg-bauhaus-blue" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-8">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="rounded-none border-bauhaus-black"
            />
            <Button
              onClick={addTask}
              className="bauhaus-btn bauhaus-btn-primary"
            >
              <Plus className="mr-2" size={16} /> Add
            </Button>
          </div>

          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              ))
            ) : (
              <div className="bauhaus-card border-dashed text-center py-12">
                <p className="text-bauhaus-gray">You don't have any tasks yet.</p>
                <p className="mt-2">Add your first task to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tasks;
