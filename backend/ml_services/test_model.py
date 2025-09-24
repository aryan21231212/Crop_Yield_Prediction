# ml_services/test_model.py
import json
from .predict_service import predict_for_input  # note the dot before predict_service

# Sample input
sample_input = {
    "Crop": "Wheat",
    "Soil_Type": "Alluvial",
    "Soil_pH": 6.5,
    "N": 120,
    "P": 60,
    "K": 40,
    "Rainfall_mm": 80,
    "Temp_Avg_C": 22,
    "Humidity": 65,
    "Sunshine_hr": 5.5,
    "Irrigation_mm": 30,
    "Fertilizer_kg_ha": 150,
    "Pesticide_kg_ha": 2.5,
    "Year": 2025
}

if __name__ == "__main__":
    result = predict_for_input(sample_input, use_recent_years=5)
    print("===== TEST MODEL OUTPUT =====")
    print(json.dumps(result, indent=4))
