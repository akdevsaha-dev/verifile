import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
const app = express()
dotenv.config()
app.use(cors({
    origin: "http://localhost:3000", // ✅ Frontend origin
    credentials: true                // ✅ Allow cookies
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});