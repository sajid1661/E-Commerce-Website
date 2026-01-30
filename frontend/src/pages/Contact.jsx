import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 border-t-color'>
           <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact-Img" />
            <div className='flex flex-col justify-center items-start gap-6'>
              <p className='font-semibold text-xl text-tertiary'>Our Store</p>
              <p className='text-secondary'>Near Mehrabpure, <br /> Behlani, PAK</p>
              <p className='text-secondary'>Tel: +923033841541 <br />Email: admin@forever.com</p>
              <p className='font-semibold text-xl text-tertiary'>Careers at Forever</p>
              <p className='text-secondary'>Learn more about our teams and job openings.</p>
              <button className='px-8 py-4 text-sm hover:bg-opacity-80 transition-all duration-500 border-color-1 bg-transparent text-primary'>Explore Jons</button>
            </div>
        </div>
        <NewsletterBox />
    </div>
  )
}

export default Contact