from fastapi import FastAPI, HTTPException
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
import uvicorn

app = FastAPI()

# Connect to your local Llama3 on GPU
llm = ChatOllama(model="llama3", temperature=0)

# Define the structure your MERN app expects
class Product(BaseModel):
    name: str = Field(description="Name of the product")
    price: float = Field(description="Numeric price value")
    category: str = Field(description="Product category (e.g. Electronics, Fashion)")

parser = JsonOutputParser(pydantic_object=Product)

# Prompt engineering to ensure LLM doesn't ramble
prompt = ChatPromptTemplate.from_template(
    "Extract product details from the text. Return ONLY JSON.\n{format_instructions}\nText: {text}"
)

@app.post("/extract-product")
async def extract_api(data: dict):
    try:
        user_text = data.get("text", "")
        chain = prompt | llm | parser
        result = chain.invoke({
            "text": user_text, 
            "format_instructions": parser.get_format_instructions()
        })
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
