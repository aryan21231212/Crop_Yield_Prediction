# ml_services/api.py
from flask import Flask, request, jsonify
from ml_services.predict_service import predict_for_input
from ml_services.irrigation import estimate_irrigation_schedule
from ml_services.data_loader import load_csv, filter_recent_years

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/predict", methods=["POST"])
def predict():
    """
    Expects JSON with fields:
    {
      "Crop": "Wheat",
      "Soil_Type": "Alluvial",
      "Soil_pH": 6.5,
      "N": 120,
      "P": 60,
      "K": 40,
      "Rainfall_mm": 500,
      "Temp_Avg_C": 22.5,
      "Humidity": 65,
      "Sunshine_hr": 7,
      "Irrigation_mm": 100,
      "Fertilizer_kg_ha": 200,
      "Pesticide_kg_ha": 5,
      "Year": 2025,   # optional
      "forecasted_rainfall_mm": 80,
      "current_soil_moisture_fraction": 0.25,
      "season_start": "2025-10-01",
      "season_end": "2026-03-31",
      "state": "Punjab"   # optional
    }
    """
    payload = request.get_json()
    if payload is None:
        return jsonify({"error": "JSON body required"}), 400

    # ML input
    ml_input = {k: v for k, v in payload.items() if k in [
        "Crop", "Soil_Type", "Soil_pH", "N", "P", "K",
        "Rainfall_mm", "Temp_Avg_C", "Humidity", "Sunshine_hr",
        "Irrigation_mm", "Fertilizer_kg_ha", "Pesticide_kg_ha", "Year"
    ]}

    # Fill Year if missing
    if "Year" not in ml_input:
        try:
            df = load_csv()
            ml_input["Year"] = int(df['Year'].max())
        except Exception:
            ml_input["Year"] = 2024

    # Predict using last 25 years
    pred = predict_for_input(ml_input, use_recent_years=25)

    # Irrigation planning
    forecasted = payload.get("forecasted_rainfall_mm", 0)
    soil_frac = payload.get("current_soil_moisture_fraction", None)
    season_start = payload.get("season_start", "2025-10-01")
    season_end = payload.get("season_end", "2026-03-31")
    irrigation_plan = estimate_irrigation_schedule(
        crop=ml_input.get("Crop", "Wheat"),
        season_start_date=season_start,
        season_end_date=season_end,
        forecasted_rainfall_mm=forecasted,
        current_soil_moisture_fraction=soil_frac,
        already_irrigated_mm=ml_input.get("Irrigation_mm", 0)
    )

    # Human-friendly recommendation
    match_percent = pred["match_percent"]
    predicted_yield = pred["predicted_yield_ton_per_ha"]
    recommendation = f"{ml_input.get('Crop')} ({round(match_percent)}% match) - Expected yield: {predicted_yield} ton/ha"

    return jsonify({
        "recommendation_text": recommendation,
        "prediction": pred,
        "irrigation_plan": irrigation_plan
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
