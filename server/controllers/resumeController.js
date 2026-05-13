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