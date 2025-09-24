import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import numpy as np

from ml_services.data_loader import load_csv, filter_recent_years
from ml_services.preprocess import build_preprocessing_pipeline, save_pipeline, ARTIFACT_DIR, NUMERIC_FEATURES, CATEGORICAL_FEATURES
from ml_services.constants import MODEL_PATH, ARTIFACT_DIR


MODEL_PATH = os.path.join(ARTIFACT_DIR, 'model.joblib')

def prepare_Xy(df):
    X = df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    y = df['Yield_ton_ha']
    return X, y

def train_and_save(df, test_size=0.2, random_state=42, quick=True):
    X, y = prepare_Xy(df)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

    pipeline = build_preprocessing_pipeline()
    pipeline.fit(X_train)

    X_train_t = pipeline.transform(X_train)
    X_test_t = pipeline.transform(X_test)

    if quick:
        model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=random_state, n_jobs=-1)
        model.fit(X_train_t, y_train)
    else:
        param_grid = {'n_estimators': [100,200], 'max_depth':[8,12,16]}
        base = RandomForestRegressor(random_state=random_state, n_jobs=-1)
        g = GridSearchCV(base, param_grid, cv=3, scoring='neg_mean_squared_error', n_jobs=-1)
        g.fit(X_train_t, y_train)
        model = g.best_estimator_

    preds = model.predict(X_test_t)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    r2 = r2_score(y_test, preds)

    save_pipeline(pipeline)
    joblib.dump(model, MODEL_PATH)

    print(f"Saved pipeline and model to {ARTIFACT_DIR}")
    print(f"RMSE: {rmse:.3f}, R2: {r2:.3f}")
    return model, pipeline, rmse, r2

if __name__ == "__main__":
    df = load_csv()
    df_recent = filter_recent_years(df, years_back=10)
    train_and_save(df_recent, quick=True)
    print("Training complete.")
