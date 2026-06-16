import ai from "../configs/ai"

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
    } catch (error) {
        
    }
}