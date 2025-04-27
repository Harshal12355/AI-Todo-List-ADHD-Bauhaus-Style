from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI
import os
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

class TaskBreakdownService:
    def __init__(self):
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
            ("system", """
             
            You are an expert at breaking down tasks into ADHD-friendly subtasks. 
            Break down the given task into clear, manageable steps that are:
            1. Specific and actionable
            2. Small enough to be completed in one sitting
            3. Include clear success criteria
            4. Account for potential distractions
            5. Include estimated time and priority
             
            Consider the language of the task and break it down into subtasks that are easy to understand and follow in that same language,
            for example if the task is in spanish, the subtasks should be in spanish.
            
            Format each subtask as a JSON object with:
            - title: A clear, concise title
            - description: Detailed steps and success criteria
            - estimated_time: How long it should take
            - priority: High/Medium/Low
            
            Return a list of these subtasks."""),
            ("user", "{task_title}")
        ])

    async def break_down_task(self, request: TaskBreakdownRequest) -> List[Subtask]:
        """Break down a task into subtasks using OpenAI"""
        try:
            chain = self.prompt | self.openai_model | self.parser
            
            try:
                result = await chain.ainvoke({"task_title": request.task_title})
                return [Subtask(**subtask) for subtask in result]
            except Exception as e:
                print(f"Error in LangChain chain: {e}")
                raise
                
        except Exception as e:
            print(f"Error breaking down task: {e}")
            raise 