import ai from "../configs/ai.js"
import Resume from '../models/Resume.js'

export const enhanceSummary = async (req, res) => {
    try {
        const {userContent} = req.body

        if(!userContent){
            return res.status(400).json({message: "Fill in the required fields"})
        }

        const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: userContent,
        config: {
         systemInstruction:
            "You are a professional resume writer. Improve the user's resume summary while keeping it truthful, concise, ATS-friendly, and professional. Return only the enhanced summary.",
        },
        });

        console.log(response.text);

        const enhancedContent = response.text
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


// enhance the job decription

export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent} = req.body

        if(!userContent){
            return res.status(400).json({message: 'Fill in the Required Fileds'})
        }

        const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: userContent,
        config: {
         systemInstruction:
            "You are a professional resume writer. Improve the user's job description while keeping it truthful, concise, ATS-friendly, and professional. Return only the enhanced job description",
        },
        });

        console.log(response.text);

        const enhancedContent = response.text
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


// controller for uploading the resume to the database


export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body
    const userId = req.userId

    if (!resumeText) {
      return res.status(400).json({ message: "Fill in the required fields" })
    }

    const systemPrompt =
      "You are an expert resume parser. Extract structured resume data from the user's resume. Return only valid JSON. Do not include markdown, explanations, or extra text."

    const userPrompt = `
    Extract the resume data from this resume text:

    ${resumeText}

    Return JSON with this exact structure without any text before or after it:


    {
        "proffesionlaSummary": "",
        "skills": [],
        "perosonalInfo": {
            "image": "",
            "full_name": "",
            "proffesion": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": "",
            "website": ""
        },
        "experience": [
            {
            "company": "",
            "position": "",
            "start_date": "",
            "end_date": "",
            "description": "",
            "is_current": false
            }
        ],
        "project": [
            {
            "name": "",
            "type": "",
            "description": ""
            }
        ],
        "education": [
            {
            "institution": "",
            "degree": "",
            "field": "",
            "graduation_date": "",
            "gpa": ""
            }
        ]
    }
    `

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      },
    })

    const extractedResume = response.text
    const parsedData = JSON.parse(extractedResume)
    const newResume = await Resume.create({userId, title, ...parsedData})

    return res.json({ resumeId: newResume._id })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}