import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Products = () => {
    const [Product, setProduct] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-product`);
            if (data?.success) {
                console.log(data)
                setProduct(data?.products)
            }
        } catch (error) {
            toast.error("some thing went wrong")
        }
    }


    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout title={"Products - Ecommerce App"}>
            <div className="container">

                <div className='container-fluid m-3 p-3'>
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>

                        <div className="col-md-9">
                            <h1 className='text-center'>All Products List</h1>
                            <div className="d-flex flex-wrap">
                                {
                                    Product?.map((p) => (
                                        <Link className='product-link' to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                                            <div className="card m-2" style={{ width: '18rem' }} >

                                                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />

                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <p className="card-text">{p.description}</p>
                                                </div>
                                            </div>
                                        </Link>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
