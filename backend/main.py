from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.predict import router as predict_router
from app.core.logger import logger

app = FastAPI(
    title="Heart Disease Prediction API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    logger.info("🚀 FastAPI server started successfully")

@app.get("/health")
def health_check():
    logger.info("Health check called")
    return {"status": "API is running"}

app.include_router(predict_router)
