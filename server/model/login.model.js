import { Schema,model } from "mongoose";

const schema = new Schema({
   
    username: {
        type:String,
        required: true,
        unique : true
    },
    email:{
        type:String,
        required: true,
        unique: true

    },
    password:{
        type :String,
        required:true,
        unique: false
    },
     name:{
        type: String,
        required: false,
        unique: false
    },
    phone:{
        type:String,
        required:false,
        unique:true
    }
});



export default model.Login || model("login",schema);