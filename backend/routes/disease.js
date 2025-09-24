import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// --- Security Warning: Use Environment Variables for API Key ---
const genAI = new GoogleGenerativeAI('AIzaSyB7SwELTT21AjgqmVtMLVqmExuqD4jXTS4');
console.log("Generative AI API Key Loaded:", !!process.env.GENERATIVE_AI_API_KEY);
// Setup Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to convert buffer to base64
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
}

// POST /predict
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
 const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });


 const prompt = `
You are an expert agricultural botanist and plant pathologist. Analyze the uploaded plant leaf image and provide a concise response in plain text, organized into 3 short paragraphs with the following headings:

Disease:
- Name of the disease affecting the plant, or "Healthy" if the plant is healthy.

Cause:
- A brief explanation of why this disease occurs.

Treatment:
- Three short, actionable steps to cure or prevent the disease.

⚠️ Important:
- Use the headings exactly as shown: Disease, Cause, Treatment.
- Keep the response concise and easy to read.
- Do NOT include extra text, numbering, or markdown formatting.
`;


    const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ prediction: text });

  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).send('Error processing the image.');
  }
});

export default router;
