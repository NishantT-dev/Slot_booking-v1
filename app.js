import express from "express"
import router from "./routes/bookingRoutes.js"
const app=express();
import morgan from "morgan"

// app level middlewares
app.use(express.json());
app.use(morgan("dev"))
app.use("/api",router)

export default app