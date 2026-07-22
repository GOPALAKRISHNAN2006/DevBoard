import mongoose from "mongoose";
import Resume from "../models/Resume.js";
export const createResume = async (req,res)=>{
   try{
    const existingResume = await Resume.findOne({
    user: req.user.id
  });

    if (existingResume) {
        return res.status(400).json({
            message: "Resume already exists. Please update it instead."
        });
    }
       const {
          headline,summary,education,skills,
          experience,certifications
        } = req.body;

    const resume = await Resume.create({
        user:req.user.id,headline,summary,education,skills,
        experience,certifications
    })
    res.status(201).json({
        message:"Resume created Successfully",resume
    })   
   }catch(error){
      console.log(error);
      res.status(500).json({
        message:error.message
      });
   } 
}


export const getResume = async(req,res)=>{
    try{
       const resume = await Resume.findOne(
        {
            user:req.user.id
        });
        if(!resume){
            res.status(404).json({
                message:"Not Found..."
            });
        }
        res.status(200).json(resume);
    }catch(error){
        console.log(error);
       res.status(500).json({
         message:error.message
       });
    }
};

export const updateResume = async(req,res)=>{
    try{
        const {headline,summary,education,skills,
          experience,certifications} = req.body;
        const resume = await Resume.findOneAndUpdate(
            {
               user: req.user.id
            },
            {
               headline,summary,education,skills,
                experience,certifications
            },
            {
                new : true
            }
        );
        if(!resume){
            return res.status(404).json({
                message:"Resume Not Found"
            });
        }
       
        res.status(200).json({
            message : "Resume Updated Successfully",
            resume});
    }catch(error){
       console.log(error);
       res.status(500).json({
          message:error.message
       })
    }
};


export const deleteResume = async(req,res)=>{
    try{
        const resume = await Resume.findOneAndDelete(
           { user: req.user.id}
        );
      if(!resume){
            res.status(404).json({
                message:"Resume Not Found"
            });
      }
      res.status(200).json({
        message:"Resume Deleted Successfully"
      })  

    }catch(error){
        console.log(error);
        res.status(500).json({
          message:error.message
       })
    }
};


export const patchResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        user : req.user.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

