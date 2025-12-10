from pydantic import BaseModel

class PredictionResponse(BaseModel):
    prediction: int
    message: str
