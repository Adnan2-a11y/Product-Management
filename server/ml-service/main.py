import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from sklearn.ensemble import IsolationForest

app = FastAPI()

# ... (rest of your LoginAttempt model and IsolationForest logic)
model = IsolationForest(contamination=0.1) 

class LoginAttempt(BaseModel):
    hour: int
    ip_numeric: int # Simplified IP representation
    device_score: int # Hash of User-Agent

@app.post("/v1/auth/predict")
async def predict_risk(data: LoginAttempt):
    input_data = np.array([[data.hour, data.ip_numeric, data.device_score]])
    is_anomaly = -1 if data.hour < 5 else 1 
    return {"status": "success", "prediction": is_anomaly}

# --- ADD THIS BLOCK ---
if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )
