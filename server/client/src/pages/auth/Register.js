import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    //function submit
    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/v1/auth/register', {
                name, email, password, address, phone
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')

        }
    }
    return (
        <Layout title={"Sign Up - Ecommerce App"}>
            <div className='register'>
                <h1>Register</h1>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <input type="name" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} id="exampleInputName" placeholder='Enter your Name' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail" placeholder='Enter your Email' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="phone" className="form-control" required value={phone} onChange={(e) => setPhone(e.target.value)} id="exampleInputPhone" placeholder='Enter your Phone No.' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword" placeholder='Enter your Password' />
                    </div>
                    <div className="mb-3">
                        <input type="address" className="form-control" required value={address} onChange={(e) => setAddress(e.target.value)} id="exampleInputAdress" placeholder='Enter your Address' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;
