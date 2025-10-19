import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProduct]= useState([]);
    useEffect(()=>{
        setLatestProduct(products.slice(0,10));
    },[]);
     
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          lorem Ipsum is simple dummy text of the printing and typesetting industry. lorem Ipsum has been the. 
          </p>
      </div>
      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
        latestProducts.map((item , index)=>(
          <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
        ))
      }
      </div>
    </div>
  )
}

export default LatestCollection;