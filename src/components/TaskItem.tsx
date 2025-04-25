
import { useState } from "react";
import { Check, Edit, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtasks: SubTask[];
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskItem = ({ task, onToggleComplete, onUpdateTask, onDeleteTask }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdateTask({
        ...task,
        title: editedTitle,
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const updatedTask = {
        ...task,
        subtasks: [
          ...task.subtasks,
          {
            id: Date.now().toString(),
            title: newSubtask.trim(),
            completed: false,
          },
        ],
      };
      onUpdateTask(updatedTask);
      setNewSubtask("");
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.map((subtask) => {
      if (subtask.id === subtaskId) {
        return { ...subtask, completed: !subtask.completed };
      }
      return subtask;
    });

    onUpdateTask({
      ...task,
      subtasks: updatedSubtasks,
    });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);
    onUpdateTask({
      ...task,
      subtasks: updatedSubtasks,
    });
  };

  return (
    <div className="bauhaus-card mb-4 group hover:border-bauhaus-blue">
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="border-bauhaus-black focus:ring-bauhaus-blue"
        />
        
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-grow rounded-none border-bauhaus-black"
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-grow cursor-pointer ${
              task.completed ? "line-through text-bauhaus-gray" : ""
            }`}
          >
            {task.title}
          </label>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isEditing) {
                handleSaveEdit();
              } else {
                setIsEditing(true);
              }
            }}
            className="size-8 p-0 rounded-none hover:bg-bauhaus-background"
          >
            {isEditing ? <Check size={16} /> : <Edit size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="size-8 p-0 rounded-none hover:bg-bauhaus-background"
          >
            {showSubtasks ? <Minus size={16} /> : <Plus size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteTask(task.id)}
            className="size-8 p-0 rounded-none text-bauhaus-red hover:bg-bauhaus-background"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </Button>
        </div>
      </div>

      {showSubtasks && (
        <div className="mt-4 ml-8 space-y-3 border-l-2 border-bauhaus-gray pl-4">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-3">
              <Checkbox 
                id={`subtask-${subtask.id}`}
                checked={subtask.completed}
                onCheckedChange={() => handleToggleSubtask(subtask.id)}
                className="border-bauhaus-black focus:ring-bauhaus-blue"
              />
              <label
                htmlFor={`subtask-${subtask.id}`}
                className={`flex-grow cursor-pointer ${
                  subtask.completed ? "line-through text-bauhaus-gray" : ""
                }`}
              >
                {subtask.title}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="size-6 p-0 rounded-none text-bauhaus-red hover:bg-bauhaus-background"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Add subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
              className="rounded-none border-bauhaus-black"
            />
            <Button
              size="sm"
              onClick={handleAddSubtask}
              className="rounded-none bg-bauhaus-black text-white hover:bg-bauhaus-black/80"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
