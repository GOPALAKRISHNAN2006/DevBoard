import User from "../models/User.js";
import Project from "../models/Project.js";
import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import Note from "../models/Note.js";

export const getDashboard = async(req,res)=>{
    try{

        const [user,projects,resume,jobs,notes] = await Promise.all([
            User.findById(req.user.id).select("-password"),
            Project.find({ owner: req.user.id }).sort({ createdAt: -1 }),
            Resume.findOne({user:req.user.id}),
            Job.find({ user: req.user.id }).sort({ createdAt: -1 }),
            Note.find({ owner: req.user.id, isArchived: false })
                .sort({ isPinned: -1, updatedAt: -1 })
        ]);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const jobStats = {
            total : jobs.length,
            applied: jobs.filter(job => job.status === "Applied").length,
            interview: jobs.filter(job => job.status === "Interview").length,
            assessment: jobs.filter(job => job.status === "Assessment").length,
            offer: jobs.filter(job => job.status === "Offer").length,
            rejected: jobs.filter(job => job.status === "Rejected").length
        };

        const summary = {
            totalProjects: projects.length,
            totalJobs: jobs.length,
            totalSkills: resume?.skills?.length || 0,
            offers: jobStats.offer
        };

         const recentProjects = projects.slice(0, 5);
         const recentJobs = jobs.slice(0, 5);
         const recentNotes = notes.slice(0, 5);

         const upcomingDeadlines = jobs
            .filter(job => job.deadline && new Date(job.deadline) >= new Date())
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 5);

        res.status(200).json({
            summary,
            user : {
                name : user.name,
                email : user.email,
                githubUsername : user.githubUsername,
                leetcodeUsername : user.leetcodeUsername,
                createdAt: user.createdAt
            },
            projects : {
                total : projects.length,
                recent : recentProjects
            },
            resume : resume ? {
                headline : resume.headline,
                skills : resume.skills,
                skillsCount : resume.skills?.length || 0,
                education : resume.education,
                educationCount : resume.education?.length || 0,
                experience : resume.experience,
                experienceCount : resume.experience?.length || 0,
                certifications : resume.certifications,
                certificationsCount: resume.certifications?.length || 0
            } : null,
            jobs : {
                ...jobStats,
                recent : recentJobs
            },
            notes: {
                total: notes.length,
                recent: recentNotes
            },
            upcomingDeadlines
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}
