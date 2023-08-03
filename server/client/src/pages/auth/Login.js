import React from 'react'
import Layout from '../../components/layout/Layout'

const Login = () => {
    return (
        <>
            <Layout title={"Login - Ecommerce App"}>
                <div className='register'>
                    <h1>login</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Login
