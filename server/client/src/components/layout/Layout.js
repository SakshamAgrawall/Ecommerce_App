import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
}


Layout.defaultProps = {
  title: "Ecommerce App"
}

export default Layout
