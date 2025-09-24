// routes/scheduler.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyB7SwELTT21AjgqmVtMLVqmExuqD4jXTS4');

// POST /api/schedule
router.post("/", async (req, res) => {
  try {
    const { cropName, soilType, soilPH, temperature, rainfall, growthStage, lastFertilizer } = req.body;

    // Input validation
    if (!cropName || !soilType || !growthStage) {
      return res.status(400).json({ message: "Missing required fields." });
    }

     const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });



    // A detailed prompt to guide the AI for a structured response
    const prompt = `
      You are an expert agronomist providing advice for a farm in India. The current date is ${new Date().toLocaleDateString("en-IN")}.
      Based on the following data, create a detailed 7-day crop management schedule in a Markdown table format.

      **Crop Data:**
      - Crop Name: ${cropName}
      - Soil Type: ${soilType}
      - Soil pH: ${soilPH || "Not specified"}
      - Average Temperature: ${temperature || "Not specified"}°C
      - Recent Rainfall (last 7 days): ${rainfall || "0"} mm
      - Current Growth Stage: ${growthStage}
      - Last Fertilizer Application: ${lastFertilizer ? new Date(lastFertilizer).toLocaleDateString("en-IN") : "Not specified"}

      **Your Task:**
      1. Provide a brief summary of your overall strategy.
      2. Generate a day-by-day schedule for the next 7 days.
      3. The schedule must include columns for: Day, Date, Irrigation Plan, Nutrient Management, and Key Tasks/Monitoring.
      4. The advice must be actionable, specific, and justified based on the provided data.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ schedule: text });
  } catch (error) {
    console.error("Error generating schedule:", error);
    res.status(500).send("Error generating the crop schedule.");
  }
});

export default router;
