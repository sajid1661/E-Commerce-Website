'use client';

import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { router, token, setCartItems, backendUrl } = useContext(ShopContext);
  const searchParams = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        router.push('/orders');
      } else {
        router.push('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div className="text-3xl">Verify</div>;
};

export default Verify;