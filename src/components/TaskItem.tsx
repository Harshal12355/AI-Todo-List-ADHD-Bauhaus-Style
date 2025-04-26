import { useState } from "react";
import { Check, Edit, Plus, Minus, Clock, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export interface SubTask {
  id: string;
  title: string;
  description: string;
  estimated_time: string;
  priority: string;
  completed: boolean;
  tags?: string[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtasks: SubTask[];
  tags?: string[];
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
  const [newTag, setNewTag] = useState("");
  const [selectedForTagging, setSelectedForTagging] = useState<{id: string, isSubtask: boolean} | null>(null);
  
  const [availableTags, setAvailableTags] = useState<string[]>(() => {
    const savedTags = localStorage.getItem("availableTags");
    return savedTags ? JSON.parse(savedTags) : ["work", "personal", "urgent", "leisure"];
  });

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
            description: "",
            estimated_time: "",
            priority: "",
            completed: false,
            tags: [],
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

  const handleAddTag = (id: string, tag: string, isSubtask: boolean) => {
    if (!tag.trim()) return;
    
    if (!availableTags.includes(tag.trim())) {
      const newAvailableTags = [...availableTags, tag.trim()];
      setAvailableTags(newAvailableTags);
      localStorage.setItem("availableTags", JSON.stringify(newAvailableTags));
    }
    
    if (isSubtask) {
      const updatedSubtasks = task.subtasks.map(subtask => {
        if (subtask.id === id) {
          const currentTags = subtask.tags || [];
          if (!currentTags.includes(tag.trim())) {
            return { ...subtask, tags: [...currentTags, tag.trim()] };
          }
        }
        return subtask;
      });
      
      onUpdateTask({
        ...task,
        subtasks: updatedSubtasks
      });
    } else {
      const currentTags = task.tags || [];
      if (!currentTags.includes(tag.trim())) {
        onUpdateTask({
          ...task,
          tags: [...currentTags, tag.trim()]
        });
      }
    }
    
    setNewTag("");
  };
  
  const handleRemoveTag = (id: string, tagToRemove: string, isSubtask: boolean) => {
    if (isSubtask) {
      const updatedSubtasks = task.subtasks.map(subtask => {
        if (subtask.id === id && subtask.tags) {
          return {
            ...subtask,
            tags: subtask.tags.filter(tag => tag !== tagToRemove)
          };
        }
        return subtask;
      });
      
      onUpdateTask({
        ...task,
        subtasks: updatedSubtasks
      });
    } else {
      if (task.tags) {
        onUpdateTask({
          ...task,
          tags: task.tags.filter(tag => tag !== tagToRemove)
        });
      }
    }
  };
  
  const renderTagInput = (id: string, isSubtask: boolean) => {
    const isSelected = selectedForTagging?.id === id && selectedForTagging?.isSubtask === isSubtask;
    
    if (isSelected) {
      return (
        <div className="flex gap-2 items-center mt-2">
          <Input
            placeholder="Add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTag.trim()) {
                handleAddTag(id, newTag, isSubtask);
              } else if (e.key === "Escape") {
                setSelectedForTagging(null);
                setNewTag("");
              }
            }}
            className="h-6 w-24 py-1 px-2 text-xs rounded-full"
          />
          
          <select 
            className="h-6 w-24 text-xs border border-gray-300 rounded-full px-1"
            onChange={(e) => {
              if (e.target.value) {
                handleAddTag(id, e.target.value, isSubtask);
                e.target.value = "";
              }
            }}
            value=""
          >
            <option value="" disabled>Select tag</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSelectedForTagging(null);
              setNewTag("");
            }}
            className="h-6 w-6 p-0 rounded-full"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>
      );
    }
    
    return (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setSelectedForTagging({ id, isSubtask })}
        className="h-6 px-2 py-0 text-xs mt-2 rounded-full border border-dashed border-gray-300"
      >
        Add tag
      </Button>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Generate a random Bauhaus color for the task card accent
  const getBauhausAccentColor = () => {
    const colors = [
      "border-l-bauhaus-red",
      "border-l-bauhaus-blue",
      "border-l-bauhaus-yellow",
      "border-l-bauhaus-black"
    ];
    // Use task.id to make the color consistent for each task
    const index = parseInt(task.id.substring(task.id.length - 2), 10) % colors.length;
    return colors[index];
  };

  return (
    <div className={`bg-white rounded-2xl border-2 border-bauhaus-black border-l-8 ${getBauhausAccentColor()} p-6 shadow-sm transition-all group hover:shadow-md`}>
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="border-2 border-bauhaus-black rounded-full focus:ring-bauhaus-blue h-5 w-5"
        />
        
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-grow rounded-full border-2 border-bauhaus-black px-4"
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-grow cursor-pointer text-lg font-medium ${
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
            className="size-8 p-0 rounded-full hover:bg-gray-100"
          >
            {isEditing ? <Check size={16} /> : <Edit size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="size-8 p-0 rounded-full hover:bg-gray-100"
          >
            {showSubtasks ? <Minus size={16} /> : <Plus size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteTask(task.id)}
            className="size-8 p-0 rounded-full text-bauhaus-red hover:bg-gray-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center mt-3">
        {task.tags?.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary"
            className="px-3 py-0.5 h-6 flex items-center gap-1 bg-gray-100 rounded-full text-xs"
          >
            {tag}
            <button 
              onClick={() => handleRemoveTag(task.id, tag, false)} 
              className="ml-1 text-bauhaus-gray hover:text-bauhaus-red"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </Badge>
        ))}
        {renderTagInput(task.id, false)}
      </div>

      {showSubtasks && (
        <div className="mt-6 ml-6 space-y-4 border-l-2 border-gray-200 pl-4">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex flex-col gap-2 pb-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id={`subtask-${subtask.id}`}
                  checked={subtask.completed}
                  onCheckedChange={() => handleToggleSubtask(subtask.id)}
                  className="mt-1 border-2 border-bauhaus-black rounded-full focus:ring-bauhaus-blue h-4 w-4"
                />
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <label
                      htmlFor={`subtask-${subtask.id}`}
                      className={`font-medium cursor-pointer ${
                        subtask.completed ? "line-through text-bauhaus-gray" : ""
                      }`}
                    >
                      {subtask.title}
                    </label>
                    
                    {subtask.priority && (
                      <Badge variant="outline" className={`${getPriorityColor(subtask.priority)} rounded-full`}>
                        <Flag className="h-3 w-3 mr-1" />
                        {subtask.priority}
                      </Badge>
                    )}
                    
                    {subtask.estimated_time && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        {subtask.estimated_time}
                      </Badge>
                    )}
                  </div>
                  
                  {subtask.description && (
                    <p className={`text-sm mt-1 ${
                      subtask.completed ? "text-bauhaus-gray" : "text-gray-600"
                    }`}>
                      {subtask.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 items-center mt-1">
                    {subtask.tags?.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="px-2 py-0 h-5 flex items-center gap-1 bg-gray-100 text-xs rounded-full"
                      >
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(subtask.id, tag, true)} 
                          className="ml-1 text-bauhaus-gray hover:text-bauhaus-red"
                        >
                          <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </Badge>
                    ))}
                    {renderTagInput(subtask.id, true)}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSubtask(subtask.id)}
                  className="text-bauhaus-red hover:bg-gray-100 rounded-full h-6 w-6 p-0"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </Button>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Add subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
              className="rounded-full border-2 border-bauhaus-black"
            />
            <Button
              size="sm"
              onClick={handleAddSubtask}
              className="rounded-full bg-bauhaus-black text-white hover:bg-bauhaus-black/80 h-8 w-8 p-0"
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
