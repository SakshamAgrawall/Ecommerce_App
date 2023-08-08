import userModel from '../models/userModels.js'
import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken';


// registerController
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'email is Required' })
        }
        if (!password) {
            return res.send({ message: 'password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'phone no is Required' })
        }
        if (!address) {
            return res.send({ message: 'address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is Required' })
        }

        //existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({ success: false, message: 'Already Register please Login', })
        }

        //register user
        const hashedPassowrd = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassowrd, answer }).save()

        res.status(200).send({
            success: true,
            message: "user register Successfully",
            user
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in register',
            error
        })
    }
}


//loginController
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(404).send({ success: false, message: 'invalid Data' })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ success: false, message: "email not register" })
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(404).send({
                success: false,
                message: "password not Matched"
            })
        }

        //token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(200).send({
            success: true,
            message: "login SuccessFully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}


// testMiddleware
export const testController = (req, res) => {
    res.send('protecte route')
}


// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newPassword is required" })
        }


        let user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({ success: false, message: "wrong Email or answer" })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password reset Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong'
        })
    }
}