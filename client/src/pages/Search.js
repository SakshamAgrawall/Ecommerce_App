import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
const Search = () => {
    const [values] = useSearch()
    const navigate = useNavigate()
    return (
        <Layout title={'Search results'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "no products found" : `results found : ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {
                            values?.results.map((p) => (
                                <div className="card m-2" style={{ width: '18rem' }} >

                                    <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">RS.{p.price}</p>
                                        <button className='btn btn-primary m-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary m-1'>ADD To CART</button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default Search
