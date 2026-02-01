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
    try:
        # 1. Handle empty or very small history (cannot train model)
        if len(data.history) < 3:
            return {
                "is_suspicious": False, 
                "score": 0.0, 
                "message": "Insufficient history for analysis"
            }

        # 2. Prepare Data
        df_history = pd.DataFrame([item.dict() for item in data.history])
        current_point = pd.DataFrame([data.current.dict()])

        # 3. Train and Predict
        model = IsolationForest(contamination=0.1, random_state=42)
        model.fit(df_history) # Important: Fit the model with history!
        
        prediction = model.predict(current_point)
        is_suspicious = True if prediction[0] == -1 else False

        return {
            "is_suspicious": is_suspicious,
            "score": float(model.decision_function(current_point)[0])
        }
    except Exception as e:
        # This will show you exactly what went wrong in the WSL terminal
        print(f"Error: {e}")
        return {"is_suspicious": False, "error": str(e)}

if __name__ == '__main__':
    # সঠিক uvicorn রান করার নিয়ম
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)