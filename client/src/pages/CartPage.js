import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    //remove itme
    const removeItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {

        }
    }

    const totalPrice = () => {
        try {
            let total = 0;
            // eslint-disable-next-line array-callback-return
            cart?.map((item) => { total = total + item.price })
            return total.toLocaleString('INR', {
                style: "currency",
                currency: 'INR'
            })
        } catch (error) {

        }
    }



    // get payment 
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    //payment
    // const handlePayment = () => {

    // }

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            toast.success("Payment Completed Successfully ");
            setTimeout(() => {
                navigate("/dashboard/user/orders");
            }, 2000)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    return (
        <Layout title={'Cart'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h1 className='text-center bg-light p-2 mb-1'>{`hello ${auth?.token && auth?.user?.name}`}</h1>
                        <h4 className='text-center'>
                            {cart?.length >= 1 ? `You Have ${cart.length} items in your Cart ${auth?.token ? '' : "Please login to checkout"}` : 'Your cart is empty'}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {
                            cart?.map(p => (
                                <div className="row mb-2 p-3 card flex-row" key={cart._id}>
                                    <div className="col-md-4">
                                        <img className="card-img-top m-auto" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: '49%' }} />

                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price :Rs.{p.price}</p>
                                        <button className='btn btn-danger' onClick={() => removeItem(p._id)}>Remove Item</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total :{totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3" key={auth.user._id}>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (<button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: '/cart' })}>Please Login to checkout</button>)
                                }
                            </div>
                        )}
                        <div className="mt-2">
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
