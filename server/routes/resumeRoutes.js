import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { createResumes, deleteResume, getPublicResumeById, getResumebyId, updateResume } from '../controllers/resumeController.js'
import upload from '../configs/multer.js'


const resumeRouter = express.Router()


resumeRouter.post('/create', protect, createResumes)
resumeRouter.put('/update',upload.single('image'), protect, updateResume)
resumeRouter.delete('/delete/:resumeId', protect, deleteResume)
resumeRouter.get('/get/:resumeId', protect, getResumebyId)
resumeRouter.get('/public/:resumeId', getPublicResumeById)

export default resumeRouter
