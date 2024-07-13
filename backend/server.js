import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js';
import "dotenv/config"
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config

const app = express();
const port = 4000

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()) //we can excess backend from frontend

//db connection
connectDb();

//api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get("/", (req, res) => {
    res.send("API WORKING")
})
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://gorahardik123:FoodDel123@cluster0.8drtv2q.mongodb.net/?