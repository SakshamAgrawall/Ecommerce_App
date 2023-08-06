import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-center'>Made with ❤</h4>
      <p className='text-center mt-0 p-0'>
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|<Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
