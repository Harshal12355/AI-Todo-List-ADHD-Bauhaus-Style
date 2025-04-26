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
import BauhausButton from "@/components/ui/bauhaus-button";
import BauhausCard from "@/components/ui/bauhaus-card";
import BauhausPattern from "@/components/ui/bauhaus-patterns";

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    // Add tags array to existing tasks if they don't have it
    return savedTasks ? JSON.parse(savedTasks).map((task: any) => ({
      ...task,
      tags: task.tags || [] // Ensure tags property exists
    })) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isBreakingDown, setIsBreakingDown] = useState(false);
  const [aiModel, setAiModel] = useState<"ollama" | "openai">("ollama");
  
  // State for tag filtering
  const [tagFilter, setTagFilter] = useState<string | null>(null); // For filtering tasks by tag

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
        tags: [], // Initialize with empty tags array
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

  /**
   * Filter tasks based on selected tag
   * @returns Filtered array of tasks or all tasks if no filter is applied
   */
  const getFilteredTasks = () => {
    if (!tagFilter) return tasks;
    return tasks.filter(task => task.tags && task.tags.includes(tagFilter));
  };

  /**
   * Get the unique set of all tags currently used across all tasks
   * @returns Array of unique tags
   */
  const getAllUsedTags = () => {
    const usedTags = new Set<string>();
    tasks.forEach(task => {
      if (task.tags) {
        task.tags.forEach(tag => usedTags.add(tag));
      }
      // Also collect tags from subtasks
      task.subtasks.forEach(subtask => {
        if (subtask.tags) {
          subtask.tags.forEach(tag => usedTags.add(tag));
        }
      });
    });
    return Array.from(usedTags);
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
        tags: [], // Initialize with empty tags array
        subtasks: subtasks.map((subtask) => ({
          id: Date.now().toString() + Math.random().toString(),
          title: subtask.title,
          description: subtask.description,
          estimated_time: subtask.estimated_time,
          priority: subtask.priority,
          completed: false,
          tags: [], // Initialize with empty tags array for subtasks
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

  // Filtered tasks based on tag filter
  const filteredTasks = getFilteredTasks();
  // Get all unique tags that are actually being used
  const usedTags = getAllUsedTags();

  return (
    <MainLayout>
      <div className="relative">
        {/* Bauhaus design patterns */}
        <BauhausPattern variant="background" />
        
        <div className="container max-w-3xl px-6 py-12 relative z-10">
          <div className="mb-2 text-blue-600 uppercase tracking-wide font-bold">
            TASK MANAGEMENT
          </div>
          <h1 className="text-5xl font-bold mb-8 tracking-tight">
            My Tasks
          </h1>
          
          {totalTasksCount > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-bauhaus-gray">
                  {completedTasksCount} of {totalTasksCount} tasks completed
                </span>
                <span className="font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-bauhaus-blue rounded-full" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Tag filter section */}
          {usedTags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-bauhaus-gray">Filter by tag:</span>
                <Button
                  variant={!tagFilter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTagFilter(null)}
                  className="h-7 px-3 rounded-full text-xs"
                >
                  All
                </Button>
                {usedTags.map(tag => (
                  <Button
                    key={tag}
                    variant={tagFilter === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                    className="h-7 px-3 rounded-full text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="rounded-full border-2 border-bauhaus-black h-12 px-6 bg-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={aiModel}
                onValueChange={(value: "ollama" | "openai") => setAiModel(value)}
              >
                <SelectTrigger className="w-[120px] rounded-full border-2 border-bauhaus-black bg-white">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-bauhaus-black bg-white">
                  <SelectItem value="ollama">Ollama</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                </SelectContent>
              </Select>
              
              <BauhausButton
                onClick={addTask}
                variant="primary"
                className="px-6"
              >
                <Plus className="mr-2" size={16} /> ADD
              </BauhausButton>
              
              <BauhausButton
                onClick={handleAIBreakdown}
                variant="secondary"
                className="px-6"
                disabled={isBreakingDown}
              >
                <Sparkles className="mr-2" size={16} />
                {isBreakingDown ? "BREAKING..." : "AI"}
              </BauhausButton>
            </div>
          </div>

          <div className="space-y-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="mb-6">
                  <TaskItem
                    task={task}
                    onToggleComplete={toggleTaskComplete}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              ))
            ) : (
              <BauhausCard className="border-dashed text-center py-12">
                <p className="text-bauhaus-gray">
                  {tasks.length > 0 
                    ? "No tasks match the selected tag filter."
                    : "You don't have any tasks yet."
                  }
                </p>
                <p className="mt-2">
                  {tasks.length > 0 
                    ? "Try selecting a different tag or clear the filter."
                    : "Add your first task to get started!"
                  }
                </p>
              </BauhausCard>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tasks;
