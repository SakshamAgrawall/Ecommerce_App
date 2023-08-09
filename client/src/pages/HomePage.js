import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import Prices from '../components/Prices'
import { Checkbox, Radio } from 'antd'
import { useCart } from '../context/cart'


const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()


  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/count-product`)
      setTotal(data?.total)
    } catch (error) {

    }
  }


  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)


  }
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/list-product/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
    }
  }




  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    getAllCategory()
    getTotal()
    // eslint-disable-next-line
  }, [])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filters-product`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
    }
  }

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/list-product/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      toast.error('error in servers')
    }
  }
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts()
    }
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) {

      filterProduct()
    }
  }, [checked, radio])
  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container">
        <div className=' m-3 p-3'>
          <div className="row mt-3">
            <div className="col-md-3 mt-5">
              <h4>Filter By Category</h4>
              <div className="d-flex flex-column">

                {categories?.map(c => (
                  <Checkbox className='mt-3' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h4 className='mt-3'>Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div className='mt-3' key={p._id} >
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>RESET FILTER</button>
            </div>
            <div className="col-md-9">
              <h1 className='text-center'>All Products</h1>
              <div className="d-flex flex-wrap">
                {
                  products?.map((p) => (
                    <div className="card m-2" key={p._id} style={{ width: '18rem' }} >

                      <img className="card-img-top m-auto" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "49%" }} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                        <p className="card-text">RS.{p.price}</p>

                        <button className='btn btn-secondary m-1' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Added to Cart') }}>ADD To CART</button>
                      </div>
                    </div>

                  ))
                }
              </div>
              <div className='m-2 p-3'>
                {products && products.length < total && (
                  <button className='btn btn-warning' onClick={(e) => {
                    e.preventDefault()
                    setPage(page + 1);

                  }}>
                    {loading ? "lodaing ..." : "Loadmore"}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout >

  )
}

export default HomePage
