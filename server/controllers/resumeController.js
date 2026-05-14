//creating a new resume

import Resume from "../models/Resume.js"

export const createResumes = async (req, res) => {
    try {
        const userId = req.userId

        const {title} = req.body

        // create new resume

        const newResume = await Resume.create({userId, title})
        return res.status(201).json({message: "Resume Created Succesfully", resume: newResume})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}



export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId

        const {resumeId} = req.params

        // delete resume

        await Resume.findOneAndDelete({userId, _id: resumeId})


        return res.status(200).json({message: "Resume deleted Succesfully"})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


//get user by id

export const getResumebyId = async (req, res) => {
    try {
        const userId = req.userId

        const {resumeId} = req.params

        const resume = await Resume.findOne({userId, _id: resumeId})

        if(!resume){
           return res.status(404).json({message: "Resume not Found"}) 
        }

        // delete resume

        await Resume.findOneAndDelete({userId, _id: resumeId})

        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined

        return res.status(200).json({resume})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
