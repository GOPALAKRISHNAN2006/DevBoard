import Project from "../models/Project.js";

export const addProject = async (req,res)=>{
   try{
       const {
        title,description,techStack,
        githubUrl,leetcodeUrl,liveUrl,featured
        } = req.body;

        if(!title || !description){
            return res.status(400).json({
                message:"Title and Description are required"
            })
        }
    const project = await Project.create({
         title,description,techStack,
        githubUrl,leetcodeUrl,liveUrl,featured,owner:req.user.id
    })
    res.status(201).json({
        message:"Project Added Successfully",project
    })   
   }catch(error){
      console.log(error);
      res.status(500).json({
        message:"Failed to Add a Project"
      });
   } 
}


export const getProject = async(req,res)=>{
    try{
        const project = await Project.find({
            owner:req.user.id
        });
        if(!project){
            res.json({
                message:"No Project Found..."
            });
        }
        res.status(200).json(project);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

export const getProjectById = async(req,res)=>{
    try{
       const project = await Project.findOne(
        {
            _id:req.params.id,
            owner:req.user.id
        });
        if(!project){
            res.status(404).json({
                message:"Not Found..."
            });
        }
        res.status(200).json(project);
    }catch(error){
        console.log(error);
       res.status(500).json({
         message:error.message
       });
    }
};

export const updateProject = async(req,res)=>{
    try{
        const {title,description,techStack,githubUrl,
            leetcodeUrl,liveUrl,featured} = req.body;
        const project = await Project.findByIdAndUpdate(
            {
                _id:req.params.id , owner:req.user.id
            },
            {
                title,description,techStack,githubUrl,
                leetcodeUrl,liveUrl,featured
            },
            {
                new : true
            }
        );
        if(!project){
            res.status(404).json({
                message:"Project Not Found"
            });
        }
       
        res.status(200).json(project);
    }catch(error){
       console.log(error);
       res.status(500).json({
          message:error.message
       })
    }
};

export const deleteProject = async(req,res)=>{
    try{
        const project = await Project.findByIdAndDelete(
            {_id : req.params.id,owner: req.user.id}
        );
      if(!project){
            res.status(404).json({
                message:"Project Not Found"
            });
      }
      res.status(200).json({
        message:"Project Deleted Successfully"
      })  

    }catch(error){
        console.log(error);
        res.status(500).json({
          message:error.message
       })
    }
};

export const patchProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
