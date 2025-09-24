from datetime import datetime, timedelta
import math

CROP_WATER_REQ = {"Wheat":450, "Mustard":350, "Barley":350}

def estimate_irrigation_schedule(crop, season_start_date, season_end_date,
                                 forecasted_rainfall_mm, current_soil_moisture_fraction=None,
                                 already_irrigated_mm=0):
    cwr = CROP_WATER_REQ.get(crop, 400)
    soil_moisture_mm = 0
    if current_soil_moisture_fraction is not None:
        soil_moisture_mm = current_soil_moisture_fraction*100
    total_available = forecasted_rainfall_mm + soil_moisture_mm + already_irrigated_mm
    deficit = max(0, cwr - total_available)

    start = datetime.strptime(season_start_date,"%Y-%m-%d")
    end = datetime.strptime(season_end_date,"%Y-%m-%d")
    days = (end-start).days
    weeks = max(1, math.ceil(days/7))
    per_week_mm = round(deficit/weeks,1)

    schedule = []
    for w in range(weeks):
        date = start + timedelta(days=7*w)
        schedule.append({"date":date.strftime("%Y-%m-%d"), "apply_mm":per_week_mm})

    return {
        "season_crop_water_requirement_mm": cwr,
        "forecasted_rainfall_mm": forecasted_rainfall_mm,
        "already_irrigated_mm": already_irrigated_mm,
        "deficit_mm": deficit,
        "weekly_schedule": schedule
    }