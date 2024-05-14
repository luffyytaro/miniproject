import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect(process.env.DB_URI);
    console.log("database connected");
}