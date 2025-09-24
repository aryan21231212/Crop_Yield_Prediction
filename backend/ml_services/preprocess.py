from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib
import os

ARTIFACT_DIR = os.path.join(os.path.dirname(__file__), 'artifacts')
os.makedirs(ARTIFACT_DIR, exist_ok=True)

NUMERIC_FEATURES = ["Soil_pH","N","P","K","Rainfall_mm","Temp_Avg_C",
                    "Humidity","Sunshine_hr","Irrigation_mm","Fertilizer_kg_ha","Pesticide_kg_ha"]
CATEGORICAL_FEATURES = ["Crop","Soil_Type"]

def build_preprocessing_pipeline():
    num_pipe = StandardScaler()
    cat_pipe = OneHotEncoder(handle_unknown='ignore', sparse_output=False)


    preproc = ColumnTransformer([
        ("num", num_pipe, NUMERIC_FEATURES),
        ("cat", cat_pipe, CATEGORICAL_FEATURES)
    ])

    pipeline = Pipeline([
        ("preproc", preproc)
    ])
    return pipeline

def save_pipeline(pipeline, filename='pipeline.joblib'):
    path = os.path.join(ARTIFACT_DIR, filename)
    joblib.dump(pipeline, path)
    return path

def load_pipeline(filename='pipeline.joblib'):
    path = os.path.join(ARTIFACT_DIR, filename)
    return joblib.load(path)
