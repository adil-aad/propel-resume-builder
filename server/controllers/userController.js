import User from '../models/User.js'
import bcrypt from 'bcrypt'





export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || email || password){
            return res.status(400).json({message: "Missing required fields"})
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already Exists"})
        }

        const hasedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name, email, password: hasedPassword
        })
        


        

    } catch (error) {
        
    }
}