import User from "../models/User.js";

export const getProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const updateProfile = async(req,res)=>{
    try{
        const {githubUsername,leetcodeUsername,bio,location,skills} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,{
                githubUsername,leetcodeUsername,bio,location,skills
            },
            {
                new : true,
                runValidators:true
            }
        ).select("-password");

        res.status(200).json({
            message:"Profile Updated Successfully",
            user : updatedUser
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}