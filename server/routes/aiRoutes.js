import express from 'express'
import protect from '../middlewares/authMiddleware'
import { enhanceJobDescription, enhanceSummary, uploadResume } from '../controllers/aiController'

const aiRouter = express.Router()

aiRouter.post('/enhance-sum', protect, enhanceSummary)
aiRouter.post('/enhance-job', protect, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, uploadResume)


export default aiRouter