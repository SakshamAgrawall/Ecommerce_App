import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../../style/AuthStyle.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()

    //function submit
    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')

        }
    }
    return (
        <Layout title={"ResetPassWord - Ecommerce App"}>

            <div className='form-container' style={{ minHeight: "100vh" }}>
                <form onSubmit={handleSumbit}>
                    <h4 className='title'>Change PAssword</h4>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" required value={answer} onChange={(e) => setAnswer(e.target.value)} id="exampleInputName" placeholder='Enter your favorite color' />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter Your New Password' className="form-control" id="exampleInputPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </form>
            </div>

        </Layout>
    )
}

export default ForgotPassword
