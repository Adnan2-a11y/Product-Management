# main.py
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.ensemble import IsolationForest
import pandas as pd
from typing import List 

app = FastAPI()
class LoginAttempt(BaseModel):
    lat: float
    lon: float
    login_hour: float

class AnomalyCheckRequest(BaseModel):
    history: List[LoginAttempt]
    current: LoginAttempt

@app.post("/check-anomly")
async def check_anomly(data: AnomalyCheckRequest):
    df = pd.DataFrame([item.dict() for item in data.history])
    current_point = pd.DataFrame([data.current.dict ()])

    model = IsolationForest(contamination = 0.1, random_state=42)
    # ৪. বর্তমান লগইনটি প্রেডিক্ট করা
    # 1 = Normal, -1 = Anomaly
    prediction = model.predict(current_point)
    is_suspicious = True if prediction[0] == -1 else False

    return {
        "is_suspicious": is_suspicious,
        "score": float(model.decision_function(current_point)[0])
    }

if __name__ == '__main__':
    # সঠিক uvicorn রান করার নিয়ম
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)