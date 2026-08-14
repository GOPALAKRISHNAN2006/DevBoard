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
        const {
            name, githubUsername, leetcodeUsername, bio, location, skills,
            linkedinUrl, portfolioUrl, twitterUrl, website, phone
        } = req.body;
        const updateFields = {
            githubUsername, leetcodeUsername, bio, location, skills,
            linkedinUrl, portfolioUrl, twitterUrl, website, phone
        };
        if (name) updateFields.name = name;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateFields,
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