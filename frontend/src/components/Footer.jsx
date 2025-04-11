import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-column sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xs'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt=''/>
            <p className='w-full md:w-2/3 text-gray-600'>We have certified sellers distributing quality products to our customers</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to='/'><li>Home</li></Link>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Get in touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-1234567890</li>
                <li>contact@me.com</li>

            </ul>
        </div>
      </div>
      <div className=''>
        <hr/>
        <p className='py-5 text-sm text-center'>&copy; 2025 Designed and used by Forever fashion choices</p>
      </div>
    </div>
  )
}

export default Footer
