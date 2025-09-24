import express from "express"
import cors from "cors"
import mongoose from "mongoose"



const app = express();

app.use(cors());
const PORT = 3000;

//DB
mongoose.conn


app.listen(PORT,()=>{
    console.log("Server is listening on port 3000")
})


app.get("/",(req,res)=>{
    res.send("Hello World from Agri Platform Backend")
})
