from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI
from langchain_community.llms import Ollama
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

class Subtask(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    title: str
    description: str
    estimated_time: str
    priority: str

class TaskBreakdownRequest(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    task_title: str
    model_type: str = "ollama"  # or "openai"

class TaskBreakdownService:
    def __init__(self):
        # Check if Ollama is available
        self.ollama_available = self._check_ollama_available()
        if self.ollama_available:
            try:
                self.ollama_model = Ollama(model="gemma:1b")
                print("Successfully connected to Ollama with model gemma:1b")
            except Exception as e:
                print(f"Error initializing Ollama model: {e}")
                self.ollama_available = False
        else:
            print("Ollama service is not available")
            
        # Initialize OpenAI
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            try:
                self.openai_model = ChatOpenAI(
                    model="gpt-3.5-turbo",
                    temperature=0.7,
                    api_key=api_key
                )
                print("Successfully initialized OpenAI API")
            except Exception as e:
                print(f"Error initializing OpenAI model: {e}")
        else:
            print("Warning: OPENAI_API_KEY not found in environment variables")
            
        # Set up parser
        self.parser = JsonOutputParser(pydantic_object=Subtask)
        
        # Set up prompt
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert at breaking down tasks into ADHD-friendly subtasks. 
            Break down the given task into clear, manageable steps that are:
            1. Specific and actionable
            2. Small enough to be completed in one sitting
            3. Include clear success criteria
            4. Account for potential distractions
            5. Include estimated time and priority
            
            Format each subtask as a JSON object with:
            - title: A clear, concise title
            - description: Detailed steps and success criteria
            - estimated_time: How long it should take
            - priority: High/Medium/Low
            
            Return a list of these subtasks."""),
            ("user", "{task_title}")
        ])
    
    def _check_ollama_available(self):
        """Check if Ollama service is available"""
        try:
            # Try to connect to Ollama API
            response = requests.get("http://localhost:11434/api/tags")
            if response.status_code == 200:
                models = response.json().get("models", [])
                print(f"Available Ollama models: {models}")
                return True
            return False
        except Exception as e:
            print(f"Error checking Ollama service: {e}")
            return False
    
    def _manual_ollama_breakdown(self, task_title: str) -> List[Subtask]:
        """Fallback method to directly call Ollama API without LangChain"""
        try:
            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "gemma:4b",
                    "prompt": f"""Break down this task into ADHD-friendly subtasks: {task_title}
                    Each subtask should have:
                    - title: A clear, concise title
                    - description: Detailed steps
                    - estimated_time: How long it should take
                    - priority: High/Medium/Low
                    
                    Return a JSON array of subtasks in this format:
                    [
                      {{
                        "title": "Example Subtask",
                        "description": "Description here",
                        "estimated_time": "30 min",
                        "priority": "High"
                      }}
                    ]
                    
                    Only return the JSON array, nothing else.""",
                    "stream": False
                }
            )
            
            if response.status_code != 200:
                raise Exception(f"Ollama call failed with status code {response.status_code}")
                
            result = response.json().get("response", "")
            # Extract JSON array from the response
            start_idx = result.find("[")
            end_idx = result.rfind("]") + 1
            
            if start_idx == -1 or end_idx == 0:
                raise Exception("Could not find valid JSON array in response")
                
            json_str = result[start_idx:end_idx]
            subtasks_data = json.loads(json_str)
            
            # Convert to Subtask objects
            subtasks = [Subtask(**item) for item in subtasks_data]
            return subtasks
            
        except Exception as e:
            print(f"Error in manual Ollama breakdown: {e}")
            # Return fallback subtasks if everything fails
            return [
                Subtask(
                    title="Step 1: Break down the task",
                    description="Start by breaking the task into smaller pieces",
                    estimated_time="15 min",
                    priority="High"
                ),
                Subtask(
                    title="Step 2: Tackle the easiest part first",
                    description="Identify and complete the simplest component to build momentum",
                    estimated_time="30 min",
                    priority="Medium"
                )
            ]

    async def break_down_task(self, request: TaskBreakdownRequest) -> List[Subtask]:
        """Break down a task into subtasks using either Ollama or OpenAI"""
        try:
            if request.model_type == "ollama":
                if not self.ollama_available:
                    print("Ollama not available, trying manual fallback...")
                    return self._manual_ollama_breakdown(request.task_title)
                    
                model = self.ollama_model
            else:
                model = self.openai_model
            
            chain = self.prompt | model | self.parser
            
            try:
                result = await chain.ainvoke({"task_title": request.task_title})
                return [Subtask(**subtask) for subtask in result]
            except Exception as e:
                print(f"Error in LangChain chain: {e}")
                
                # If using Ollama and LangChain fails, try direct API call
                if request.model_type == "ollama":
                    print("Trying direct Ollama API call...")
                    return self._manual_ollama_breakdown(request.task_title)
                raise
                
        except Exception as e:
            print(f"Error breaking down task: {e}")
            raise 