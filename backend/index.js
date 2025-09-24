import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"



dotenv.config();
const app = express();

app.use(cors());
const PORT = 3000;

//DB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("DB connection error:", err.message));


app.listen(PORT,()=>{
    console.log("Server is listening on port 3000")
})


app.get("/",(req,res)=>{
    res.send("Hello World from Agri Platform Backend")
})
