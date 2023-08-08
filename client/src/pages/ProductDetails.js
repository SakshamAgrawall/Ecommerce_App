import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setProduct(data?.singleProduct)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    },
        [params?.slug])

    return (
        <Layout title={"ProductDetails"}>
            <div className="row container m-3">
                <div className="col-md-6">
                    <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product.name} height='300' width={'350px'} />
                </div>
                <div className="col-md-6 text-center">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : Rs.{product.Price}</h6>
                    <h6>Category : {product.category.name}</h6>
                    <button className='btn btn-secondary m-1'>ADD To CART</button>
                </div>
            </div>
            <div className="row"></div>
        </Layout>
    )
}

export default ProductDetails
