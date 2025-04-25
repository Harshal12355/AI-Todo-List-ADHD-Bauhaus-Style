export interface Subtask {
  title: string;
  description: string;
  estimated_time: string;
  priority: string;
}

export const breakdownTask = async (taskTitle: string, modelType: "ollama" | "openai" = "ollama"): Promise<Subtask[]> => {
  try {
    const response = await fetch("http://localhost:8000/api/breakdown-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskTitle,
        model_type: modelType,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to break down task");
    }

    const data = await response.json();
    return data.subtasks;
  } catch (error) {
    console.error("Error breaking down task:", error);
    throw error;
  }
}; 