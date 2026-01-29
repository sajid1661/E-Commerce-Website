import React, { useContext } from 'react';
import { ShopContext } from '../../src/context/ShopContext'; // Adjust path
import Link from 'next/link';

const ProductItem = ({ id, image, name, price }: { id: string; image: string[]; name: string; price: number }) => {
  const { currency } = useContext(ShopContext);

  return (
    <>
      <Link className="text-gray-700 cursor-pointer" href={`/product/${id}`}>
        <div className="overflow-hidden">
          <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="Pic" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </>
  );
};

export default ProductItem;