import mongoose from "mongoose";
import bycrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true})


UserSchema.methods.comparePassword = function(password){
    return bycrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User