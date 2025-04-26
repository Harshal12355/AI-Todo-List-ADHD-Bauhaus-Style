from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from task_breakdown import TaskBreakdownService, TaskBreakdownRequest, Subtask
import uvicorn

app = FastAPI()
task_service = TaskBreakdownService()

# Configure CORS - update to ensure preflight requests are handled properly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,  # Cache preflight requests for 24 hours
)

class TaskRequest(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    title: str
    model_type: str = "ollama"  # or "openai"

class TaskBreakdownResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    subtasks: list[Subtask]

@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Task breakdown service is running"}

@app.post("/api/breakdown-task", response_model=TaskBreakdownResponse)
async def breakdown_task(task_request: TaskRequest):
    try:
        request = TaskBreakdownRequest(
            task_title=task_request.title,
            model_type=task_request.model_type
        )
        subtasks = await task_service.break_down_task(request)
        return TaskBreakdownResponse(subtasks=subtasks)
    except Exception as e:
        print(f"Error in breakdown_task: {str(e)}")  # Add logging
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 