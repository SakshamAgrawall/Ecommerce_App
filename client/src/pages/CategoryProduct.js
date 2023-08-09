import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])


    const getProductsByCat = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
        setProducts(data?.products)
        setCategory(data?.category)
    }

    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])
    return (
        <Layout title={'Category'}>
            <div className="container mt-3">
                <h4 className='text-center'>Category - {category.name}</h4>
                <h6 className='text-center'>{products?.length} result found</h6>
                <div className="d-flex flex-wrap">
                    {
                        products?.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} key={products._id}>

                                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">RS.{p.price}</p>

                                    <button className='btn btn-secondary m-1'>ADD To CART</button>
                                </div>
                            </div>

                        ))
                    }
                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct
