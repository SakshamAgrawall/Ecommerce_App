import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'
const Header = () => {
  const [auth, setAuth] = useAuth()
  const categories = useCategory()
  const [cart] = useCart()

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    })
    localStorage.removeItem("auth")
    toast.success('Logout success')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand" > 🛍️ ECOMMERCE APP</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li>
                    <Link key={c._id}
                      className="dropdown-item"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {
              !auth.user ? (<><li className="nav-item">
                <NavLink to="/register" className="nav-link">register</NavLink>
              </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li></>) : (<li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" >
                    {auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>dashboard</NavLink></li>
                    <li><NavLink to="/login" className="dropdown-item" onClick={handleLogout}>Logout</NavLink></li>
                  </ul>
                </li>
              )
            }
            <li className="nav-item">
              <Badge count={cart?.length} showZero offset={[-1, 10]} size='middle'>
                <NavLink to="/cart" className="nav-link">Cart</NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header
