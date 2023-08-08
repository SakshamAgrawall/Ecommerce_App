import axios from 'axios';
import React from 'react';
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, SetValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keyword}`)
            SetValues({ ...values, results: data })
            navigate('/search')
        } catch (error) { }
    }

    return (
        <div>
            <form className='d-flex' role='search' onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Enter Product" aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => SetValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>

    )
}


export default SearchInput
