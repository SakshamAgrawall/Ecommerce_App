import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [auth, setAuth] = useAuth()


    //get user data
    useEffect(() => {
        if (auth?.user) {

            // const { email, name, phone, address } = auth?.User;
            setName(auth?.user.name);
            setEmail(auth?.user.email);
            setAddress(auth?.user.address);
            setPhone(auth?.user.phone);
            // setEmail(email);
            // setName(name);
            // setPhone(phone);
            // setAddress(address);
        }
    }, [auth?.user])



    //function submit

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
                name, email, password, address, phone
            });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.UpdateUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data.UpdateUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('profile updated successfully')
            }
        } catch (error) {
            toast.error('Something went wrong')

        }
    }
    return (


        <Layout title={"Your Profile - Ecommerce App"} >


            <div className='container-fluid m-3 p-3 dashboard'>

                <div className='row'>

                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-8'>
                        <div className='form-container' style={{ minHeight: "100vh" }}>
                            <form onSubmit={handleSumbit}>
                                <h4 className='title'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <input type="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputName" placeholder='Enter your Name' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" disabled value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail" placeholder='Enter your Email' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <input type="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="exampleInputPhone" placeholder='Enter your Phone No.' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword" placeholder='.......' />
                                </div>
                                <div className="mb-3">
                                    <input type="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="exampleInputAdress" placeholder='Enter your Address' />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Profile
