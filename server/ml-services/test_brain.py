from fastapi import FastAPI
from langchain_ollama import ChatOllama

app = FastAPI()

# This connects LangChain to your local GPU-powered Llama
llm = ChatOllama(model="llama3", temperature=0)

@app.post("/ai/process")
async def process_request(data: dict):
    # This is where the 'magic' happens on your 3060
    response = llm.invoke(data["prompt"])
    return {"result": response.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
