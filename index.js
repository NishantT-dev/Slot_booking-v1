// import packages and modules
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config();

// health check route
app.get("/health",(req,res)=>{
    res.send(" Working smoothly")
});

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(` Server running at PORT ${PORT}`)
})