# ml_services/data_loader.py
import pandas as pd
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'yield_history.csv')

def load_csv(path=None):
    """Load dataset. If path is None, uses default DATA_PATH."""
    if path is None:
        path = DATA_PATH
    df = pd.read_csv(path)
    required = {"Year","Crop","Soil_Type","Soil_pH","N","P","K","Rainfall_mm","Temp_Avg_C","Humidity","Sunshine_hr","Irrigation_mm","Fertilizer_kg_ha","Pesticide_kg_ha","Yield_ton_ha"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns in CSV: {missing}")
    return df

def filter_recent_years(df, years_back=5, reference_year=None):
    if reference_year is None:
        reference_year = df['Year'].max()
    min_year = reference_year - (years_back - 1)
    return df[df['Year'] >= min_year].copy()
