import Project from "../models/Project.js";

export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack = [],
      githubUrl,
      leetcodeUrl,
      liveUrl,
      status,
      featured,
    } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      techStack,
      githubUrl,
      leetcodeUrl,
      liveUrl,
      status,
      featured,
      owner: req.user.id,
    });

    return res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProject = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status, tech, sort = "-createdAt" } = req.query;

    const query = { owner: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    
    if (status) {
      query.status = status;
    }
    
    if (tech) {
      query.techStack = { $regex: tech, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const projects = await Project.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Project.countDocuments(query);

    return res.status(200).json({
      projects,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProjectById = async(req,res)=>{try{const project=await Project.findOne({_id:req.params.id,owner:req.user.id});if(!project)return res.status(404).json({message:"Project not found"});return res.status(200).json(project);}catch(error){return res.status(500).json({message:error.message});}};
export const updateProject = async(req,res)=>{try{const project=await Project.findOneAndUpdate({_id:req.params.id,owner:req.user.id},{$set:req.body},{new:true,runValidators:true});if(!project)return res.status(404).json({message:"Project not found"});return res.status(200).json({message:"Project updated successfully",project});}catch(error){return res.status(500).json({message:error.message});}};
export const deleteProject = async(req,res)=>{try{const project=await Project.findOneAndDelete({_id:req.params.id,owner:req.user.id});if(!project)return res.status(404).json({message:"Project not found"});return res.status(200).json({message:"Project deleted successfully"});}catch(error){return res.status(500).json({message:error.message});}};
export const patchProject = updateProject;
