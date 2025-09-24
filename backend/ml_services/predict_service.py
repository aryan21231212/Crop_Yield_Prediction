import pandas as pd
import numpy as np
import joblib
from ml_services.preprocess import load_pipeline, NUMERIC_FEATURES, CATEGORICAL_FEATURES
from ml_services.data_loader import load_csv, filter_recent_years
from ml_services.train_model import MODEL_PATH
from ml_services.nearest_match import find_nearest
from ml_services.constants import MODEL_PATH


def load_model():
    model = joblib.load(MODEL_PATH)
    pipeline = load_pipeline()
    return model, pipeline

def predict_for_input(user_input: dict, use_recent_years=5):
    df = load_csv()
    df_recent = filter_recent_years(df, years_back=use_recent_years)

    model, pipeline = load_model()

    input_df = pd.DataFrame([user_input])
    for col in NUMERIC_FEATURES:
        if col not in input_df.columns or pd.isna(input_df.loc[0, col]):
            input_df.loc[0, col] = df_recent[col].median()
    for col in CATEGORICAL_FEATURES:
        if col not in input_df.columns or pd.isna(input_df.loc[0, col]):
            input_df.loc[0, col] = df_recent[col].mode()[0]

    X_user = input_df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    X_user_t = pipeline.transform(X_user)
    pred_yield = float(model.predict(X_user_t)[0])

    idxs, dists, nearest_rows = find_nearest(input_df, df_recent, n_neighbors=5)
    max_possible = dists.max() if dists.max() > 0 else 1.0
    match_scores = (1 - dists/max_possible)*100
    avg_match = float(np.clip(match_scores.mean(),0,100))

    return {
        "predicted_yield_ton_per_ha": round(pred_yield,3),
        "match_percent": round(avg_match,1),
        "nearest_examples": nearest_rows.to_dict(orient='records'),
        "distances": dists.tolist(),
        "match_scores": match_scores.tolist()
    }
