'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // ✅ Correct import for App Router
import axios from 'axios';
import { API_URL } from '@/utils/path';
import { CheckCircle } from 'lucide-react';

const Thankyou = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams ? searchParams.get('session_id') : null;
  const [hasRun, setHasRun] = useState(false);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const createOrder = async () => {
      try {
        const user = localStorage.getItem('loginData');
        const userId = user ? JSON.parse(user).id : null;
        const strinUSerId = String(userId);
        if (!userId) throw new Error('User ID not found.');

        const token = localStorage.getItem('authToken')?.replace(/^"|"$/g, '');
        if (!token) throw new Error('Authorization token is missing.');

        const response = await axios.post(
          `${API_URL}/orders/create`,
          {
            sessionId,
            userId: strinUSerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setStatus('success');
      } catch (error: any) {
        console.error('Order creation failed:', error.response?.data || error.message);
        setStatus('error');
      }
    };

    if (sessionId && !hasRun) {
      setHasRun(true);
      createOrder();
    }
  }, [sessionId, hasRun]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-gray-100 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
        {status === 'success' && (
          <>
            <CheckCircle className="mx-auto text-green-500" size={64} />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank you for your purchase!</h1>
            <p className="text-gray-600 mt-2">
              Your order has been successfully placed. A confirmation has been sent to your email.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Go to Home
            </button>
          </>
        )}

        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full border-4 border-t-black border-gray-300 h-16 w-16 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-700">Finalizing your order...</h1>
            <p className="text-gray-500 mt-2">Please wait a moment while we complete the process.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong</h1>
            <p className="text-gray-600 mt-2">We couldn’t create your order. Please try again or contact support.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Return Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Thankyou;
