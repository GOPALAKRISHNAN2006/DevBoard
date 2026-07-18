import User from "../models/User.js";
import { getLeetcodeProfile } from "../services/leetcodeService.js";

export const fetchLeetcodeProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
         if (!user.leetcodeUsername) {
            return res.status(400).json({
                message: "LeetCode username not found",
            });
        }
        const profile = await getLeetcodeProfile(user.leetcodeUsername);
        if (!profile) {
            return res.status(404).json({
                message: "LeetCode user not found",
            });
        }
        res.status(200).json(profile);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};