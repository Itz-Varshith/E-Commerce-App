import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"Contact"} text2={"Us"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
       
          <img src={assets.contact_img} className='w-full md:max-w-[480px]'/>
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>54709 William street, New york<br/>Street's lane</p>
            <p className='text-gray-500'>Tel: 1234567<br/>Email:clothes@gmail.com</p>
            <p className='text-semibold'>Career options with us</p>
            <p className='text-gray-500'>Join our community by joining our subscription service to get more details</p>
          </div>
        </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
