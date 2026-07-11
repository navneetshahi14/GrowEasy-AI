import express from 'express'
import cors from 'cors'
import importRoute from './routes/import.route.js'
import morgan from 'morgan'

const app = express()
app.use(cors())

app.use(morgan("dev"))

app.use(express.json())

app.use("/api",importRoute)

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Server is running healthy"
    })
})


export default app