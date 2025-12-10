from fastapi import APIRouter, HTTPException
from app.scehmas.predict_schema import HeartInput
from app.scehmas.reponse_schema import PredictionResponse
from app.ml.model import HeartDiseaseModel
from app.core.logger import logger
import numpy as np

router = APIRouter()

model = HeartDiseaseModel()
model.load("app/models/heart_model.pkl")

@router.post("/predict", response_model=PredictionResponse)
def predict_heart(data: HeartInput):
    try:
        logger.info(f"Received input: {data}")

        input_data = np.array([[
            data.age, data.sex, data.cp, data.trestbps, data.chol,
            data.fbs, data.restecg, data.thalach, data.exang,
            data.oldpeak, data.slope, data.ca, data.thal
        ]])

        prediction = model.predict(input_data)
        result = int(prediction[0])

        logger.info(f"Prediction result: {result}")

        return PredictionResponse(
            prediction=result,
            message="High Risk" if result == 1 else "Low Risk"
        )

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")
