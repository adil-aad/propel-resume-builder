import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", ()=>{console.log("DataBase Connected Succesfully")})

        let mongodbURI = process.env.MONGODB_URI
        const projectName = 'Propel-Resume'

        if (!mongodbURI){
            throw new Error('Mongodb URI environment variable not set')
        }

        if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0, -1)
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)
    } catch (error) {
        console.error("Error connection to mongodb", error)
    }
    
}


export default connectDB