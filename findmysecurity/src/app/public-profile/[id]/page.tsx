// pages/user/[id].js
'use client';
import { useEffect , useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';



import UserProfileCard from "@/sections/components/Public Profile/UserProfileCard";


export default function UserPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
        console.log('User Data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {user ? <UserProfileCard user={user} /> : <p className="text-center mt-10">Loading...</p>}
    </div>
  );
}
