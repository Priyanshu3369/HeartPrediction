import joblib
from sklearn.ensemble import RandomForestClassifier

class HeartDiseaseModel:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=200,
            max_depth=5,
            random_state=42
        )

    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)
        return self.model

    def predict(self, input_data):
        """Input must be a NumPy array or 2D list"""
        return self.model.predict(input_data)

    def save(self, path="backend/app/models/heart_model.pkl"):
        joblib.dump(self.model, path)

    def load(self, path="backend/app/models/heart_model.pkl"):
        self.model = joblib.load(path)
        return self.model
