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

export const fetchLeetcodeStats = async(req,res)=>{
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
       const solved = profile.submitStats.acSubmissionNum;
       const totalSolved = solved.find(item=>item.difficulty === "All") ?.count || 0;
       const easySolved = solved.find(item=>item.difficulty === "Easy") ?.count || 0;
       const mediumSolved = solved.find(item=>item.difficulty === "Medium") ?.count || 0;
       const hardSolved = solved.find(item=>item.difficulty === "Hard") ?.count || 0;

       res.json({
        username: profile.username,
        ranking: profile.profile.ranking,
        reputation: profile.profile.reputation,
        avatar: profile.profile.userAvatar,
        realName: profile.profile.realName,
        totalSolved, easySolved, mediumSolved,hardSolved
       });

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};