'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import TrainingProfileCard from '@/sections/components/Public Profile/TrainingProfileCard';

export default function ProviderPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const token = localStorage.getItem('authToken')?.replace(/^"|"$/g, '');
        const response = await axios.get(
          `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/auth/get-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Provider Data:', response.data);
        setProvider(response.data);
      } catch (error) {
        console.error('Failed to fetch provider:', error);
      }
    };

    if (id) fetchProvider();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {provider ? (
        <TrainingProfileCard provider={provider} />
      ) : (
        <p className="text-center mt-10">Loading...</p>
      )}
    </div>
  );
}
