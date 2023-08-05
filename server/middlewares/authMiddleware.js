import JWT from 'jsonwebtoken';
import userModel from '../models/userModels.js';

//protected routes token base

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.send({
                success: false,
                message: "UnAuthorized Access"
            })
        } else {
            next()
        }

    }
    catch (error) {
        console.log(error);
    }
}
export const isUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 0) {
            return res.send({
                success: false,
                message: "UnAuthorized Access"
            })
        } else {
            next()
        }

    }
    catch (error) {
        console.log(error);
    }
}