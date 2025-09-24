# ml_services/nearest_match.py
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from ml_services.preprocess import load_pipeline, NUMERIC_FEATURES, CATEGORICAL_FEATURES

def find_nearest(user_input_df: pd.DataFrame, df: pd.DataFrame, n_neighbors: int = 5):
    """
    Finds the nearest neighbors for the input row(s) in the reference dataset using
    preprocessed features (numeric + one-hot encoded categorical).

    Args:
        user_input_df: pd.DataFrame containing one or more input rows.
        df: pd.DataFrame reference dataset.
        n_neighbors: number of nearest neighbors to return.

    Returns:
        idxs: indices of the nearest neighbors in df
        dists: Euclidean distances to the neighbors
        matched_rows: DataFrame of the nearest neighbor rows
    """

    # Load preprocessing pipeline
    pipeline = load_pipeline()

    # Select features and transform
    X_all = df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    X_all_t = pipeline.transform(X_all)

    X_user = user_input_df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    X_user_t = pipeline.transform(X_user)

    # Fit NearestNeighbors on the dataset
    nbr = NearestNeighbors(n_neighbors=n_neighbors, metric='euclidean', n_jobs=-1)
    nbr.fit(X_all_t)

    # Query nearest neighbors for input
    dists, idxs = nbr.kneighbors(X_user_t, return_distance=True)

    # Extract matching rows
    matched_rows = df.iloc[idxs[0]].copy()

    return idxs[0], dists[0], matched_rows
