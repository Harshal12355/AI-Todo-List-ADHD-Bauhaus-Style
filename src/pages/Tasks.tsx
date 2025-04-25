import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Settings } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import TaskItem, { Task } from "@/components/TaskItem";
import { breakdownTask, Subtask } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isBreakingDown, setIsBreakingDown] = useState(false);
  const [aiModel, setAiModel] = useState<"ollama" | "openai">("ollama");

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

  const handleAIBreakdown = async () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title first.",
        variant: "destructive",
      });
      return;
    }

    setIsBreakingDown(true);
    try {
      const subtasks = await breakdownTask(newTaskTitle, aiModel);
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        subtasks: subtasks.map((subtask) => ({
          id: Date.now().toString() + Math.random().toString(),
          title: subtask.title,
          description: subtask.description,
          estimated_time: subtask.estimated_time,
          priority: subtask.priority,
          completed: false,
        })),
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      toast({
        title: "Task added with AI breakdown",
        description: "Your task has been broken down into manageable subtasks.",
      });
    } catch (error) {
      console.error("Error breaking down task:", error);
      
      // Check if it might be an Ollama connection issue
      if (aiModel === "ollama") {
        toast({
          title: "Ollama connection error",
          description: "Could not connect to Ollama. Make sure Ollama is running and the gemma:1b model is installed, or try using OpenAI instead.",
          variant: "destructive",
        });
        // Suggest switching to OpenAI
        setAiModel("openai");
      } else {
        toast({
          title: "Error",
          description: "Failed to break down task. Please try again or check your API key configuration.",
          variant: "destructive",
        });
      }
    } finally {
      setIsBreakingDown(false);
    }
  };

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
            <div className="flex gap-2">
              <Select
                value={aiModel}
                onValueChange={(value: "ollama" | "openai") => setAiModel(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ollama">Ollama</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleAIBreakdown}
                className="bauhaus-btn bauhaus-btn-secondary"
                disabled={isBreakingDown}
              >
                <Sparkles className="mr-2" size={16} />
                {isBreakingDown ? "Breaking down..." : "AI Breakdown"}
              </Button>
            </div>
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
