import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/cart'
const Search = () => {
    const [values] = useSearch()
    const [cart, setCart] = useCart()

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

                                    <img className="card-img-top m-auto" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "49%" }} />
                                    <div className="card-body">
                                        <div className="card-name-price">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-title card-price">Rs.{p.price}</p>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        </div>
                                        <button className='btn btn-dark m-1' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Added to Cart') }}>ADD To CART</button>
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
