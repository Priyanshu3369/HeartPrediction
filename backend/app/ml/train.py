import os
from preprocess import load_data, preprocess_data
from model import HeartDiseaseModel

DATA_PATH = "backend/data/heart.csv"
MODEL_PATH = "backend/app/models/heart_model.pkl"

def train_model():
    print("Loading dataset...")
    df = load_data(DATA_PATH)

    print("Preprocessing...")
    X_train, X_test, y_train, y_test = preprocess_data(df)

    print("Training model...")
    model = HeartDiseaseModel()
    model.train(X_train, y_train)

    print("Saving model...")
    model.save(MODEL_PATH)

    print("Training complete!")
    return True

if __name__ == "__main__":
    train_model()
