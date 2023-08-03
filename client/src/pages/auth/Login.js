import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import '../../style/AuthStyle.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    //function submit
    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/v1/auth/login', {
                email, password
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')

        }
    }

    return (
        <>
            <Layout title={"Login - Ecommerce App"}>
                <div className='form-container'>
                    <form onSubmit={handleSumbit}>
                        <h4 className='title'>LOGIN NOW</h4>
                        <div className="mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className="form-control" id="exampleInputPassword" />
                        </div>

                        <button type="submit" className="btn btn-primary">LogIn</button>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Login;
