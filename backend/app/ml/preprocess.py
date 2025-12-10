import pandas as pd
from sklearn.model_selection import train_test_split

def load_data(path: str):
    """Load dataset from CSV"""
    df = pd.read_csv(path)
    return df

def preprocess_data(df: pd.DataFrame):
    """Split into X and y and train-test"""
    X = df.drop("target", axis=1)
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    return X_train, X_test, y_train, y_test
