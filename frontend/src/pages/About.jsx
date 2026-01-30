import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t-color'> 
          <Title  text1={'ABOUT'} text2={'US'}/>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="About_img" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-secondary'>
              <p>Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online. Our journey begon with a simple idea to provide a platform where customers can easily discover, explore, and purchase a wide range of products form the comfort of their homes.</p>
              <p>Since our incerption, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. Frome fashion and beauty to electronics and home essantials, we offer an extensive collectin foruced from trusted brands and suppliers. </p>
              <b className='text-tertiary'>Our Mession</b>
               <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shipping experience that exceds expectations, from browsing and ordering to delivery and beyond.</p>
            </div>
        </div>

        <div className='text-xl py-4 '>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
             <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-color-1'>
              <b>Quality Assurance:</b>
              <p className='text-secondary'>We meticulously select and vet each product to ensure it meets our stringent quality standards. </p>
             </div>
             <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-color-1'>
              <b>Convenience:</b>
              <p className='text-secondary'>With our user-friendly interface and hassle-free ordering process, shopping has  </p>
             </div>
             <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-color-1'>
              <b>Exceptional Customer Service:</b>
              <p className='text-secondary'>Our team of dedicated professionals is here to assist you to way, ensuring your satisfaction is our top priority.</p>
             </div>
        </div>
        <NewsletterBox />
    </div>
  )
}

export default About