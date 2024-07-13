import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://gorahardik123:FoodDel123@cluster0.8drtv2q.mongodb.net/food-del').then(()=>console.log("Db connected"));

}