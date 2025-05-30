export interface Subtask {
  title: string;
  description: string;
  estimated_time: string;
  priority: string;
}

// Get the API base URL based on environment
const getApiBaseUrl = () => {
  // In production, check for environment variable first
  if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In production without custom API URL, use relative paths (for monorepo deployment)
  if (import.meta.env.PROD) {
    return '';
  }
  // In development, use localhost
  return 'http://localhost:8000';
};

export const breakdownTask = async (taskTitle: string, modelType: "ollama" | "openai" = "ollama"): Promise<Subtask[]> => {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/api/breakdown-task`, {
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