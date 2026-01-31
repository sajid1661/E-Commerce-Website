'use client';

import React, { Suspense, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyContent = () => {
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
    } catch (error: any) {
      console.log(error);
      toast.error((error as any).message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div className="text-3xl">Verifying payment...</div>;
};

const Verify = () => {
  return (
    <Suspense fallback={<div className="text-3xl">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
};

export default Verify;