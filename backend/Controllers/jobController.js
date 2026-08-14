import Job from "../models/Job.js";


export const createJob = async (req,res)=>{
   try{
       const {
          company,role,location,jobType,
          status,appliedDate,deadline,salary,jobLink,notes
        } = req.body;
    if (!company || !role || !location) {
      return res.status(400).json({
        message: "Company, role and location are required."
    });
}
    const job = await Job.create({
         user:req.user.id,company,role,location,jobType,
          status,appliedDate,deadline,salary,jobLink,notes
    })
    res.status(201).json({
        message: "Job created successfully",
        job
    });
   }catch(error){
      console.log(error);
      res.status(500).json({
        message:error.message
      });
   } 
}

export const getJob = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { sort, search = "", status, jobType } = req.query;

        const query = { user: req.user.id };

        if (search) {
            // Search by company or role
            query.$or = [
                { company: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } }
            ];
        }

        if (status) query.status = status;
        if (jobType) query.jobType = jobType;

        let sortOption = { createdAt: -1 };
        if (sort === "oldest") sortOption = { createdAt: 1 };
        if (sort === "deadline") sortOption = { deadline: 1 };
        if (sort === "salary") sortOption = { salary: -1 };

        const skip = (page - 1) * limit;

        const jobs = await Job.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
            
        const totalJobs = await Job.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobById = async(req,res)=>{
    try{
      
        const job = await Job.findOne(
            {_id:req.params.id, user:req.user.id}
        );
        if(!job){
           return res.status(404).json({
                message:"Not Found..."
            });
        }
        res.status(200).json(job);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const deleteJob = async(req,res)=>{
    try{
        const job = await Job.findOneAndDelete(
            {_id : req.params.id,user: req.user.id}
        );
      if(!job){
            res.status(404).json({
                message:"Job Not Found"
            });
      }
      res.status(200).json({
        message:"Job Deleted Successfully"
      })  

    }catch(error){
        console.log(error);
        res.status(500).json({
          message:error.message
       })
    };
};

export const patchJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const {company,role,location,jobType,
        status,appliedDate,deadline,salary,
        jobLink,notes} = req.body;
 if (!company || !role || !location) {
     return res.status(400).json({
        message: "Company, role and location are required."
    });
}
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        company,role,location,jobType,
        status,appliedDate,deadline,salary,
        jobLink,notes
      },
      {
        new: true,
        runValidators:true
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobStats = async(req,res)=>{
  try{
    const jobs = await Job.find({
      user:req.user.id
    });

    const totalJobs = jobs.length;
    const applied = jobs.filter(
      job=>job.status === "Applied"
    ).length;

     const interview = jobs.filter(
      job=>job.status === "Interview"
    ).length;

     const assesment = jobs.filter(
      job=>job.status === "Assessment"
    ).length;
    
     const offer = jobs.filter(
      job=>job.status === "Offer"
    ).length;

     const rejected = jobs.filter(
      job=>job.status === "Rejected"
    ).length;

     res.status(200).json({
      totalJobs,applied,interview,
      assesment,offer,rejected
     })


  }catch(error){
    res.status(500).json({
      message:error.message
    })
  }
};

export const searchJobs = async (req,res)=>{
  try{
    const {company} = req.query;
    const jobs = await Job.find({
      user:req.user.id,
      company:{
        $regex: company,
        $options:"i"
      }
    });
    res.status(200).json({
      total:jobs.length,jobs
    });
  }catch(error){
    res.status(500).json({
      message: error.message
    });
  }
};

export const filterJobs = async (req,res)=>{
  try{
    const {status} = req.query;
    const jobs = await Job.find({
      user:req.user.id,
      status
    });
    res.status(200).json({
      total:jobs.length,jobs
    });
  }catch(error){
    res.status(500).json({
      message: error.message
    });
  }
};






