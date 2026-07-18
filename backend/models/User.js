import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
     name : {
        type: String,
        required:true,
        trim:true
    },
    email : {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    githubUsername:{
        type:String,
        default:"",
        trim:true
    },
    leetcodeUsername:{
        type:String,
        default:"",
        trim:true
    },
    bio:{
        type:String,
        default:"",
        maxlength:250
    },
    location:{
        type:String,
        default:""
    },
    avatar:{
        type:String,
        default:""
    },
    skills:[
        {
            type:String,
            trim:true
        }
    ]
   },{
    timestamps:true
   }

)

export default mongoose.model("User",userSchema);