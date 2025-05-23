"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import TrainingProfileCard from "@/sections/components/Public Profile/TrainingProfileCard";
import { API_URL } from "@/utils/path";

// Define interfaces based on API response
interface Permissions {
  acceptTerms: boolean;
  acceptEmails: boolean;
  premiumServiceNeed: boolean;
}

interface CourseProvider {
  id: number;
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  registrationNumber: string;
  website: string;
  servicesRequirements: string[];
  securityServicesOfferings: string[];
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  validated: boolean;
  isSubscriber: boolean;
  subscriptionTier: string | null;
  courseProvider: CourseProvider | null;
  profile: { profilePhoto?: string } | null;
}

interface Provider {
  courseProvider: CourseProvider;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    validated: boolean;
    isSubscriber: boolean;
    subscriptionTier: string | null;
  };
  profile?: {
    profilePhoto?: string;
  };
}

/**
 * Fetches training provider data by ID and renders the TrainingProfileCard.
 */
export default function ProviderPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [apiUser, setApiUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) {
        setError("No provider ID provided");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
        const response = await axios.get(
          `${API_URL}/auth/get-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Provider Data:", response.data);
        setApiUser(response.data);
      } catch (error) {
        console.error("Failed to fetch provider:", error);
        setError("Failed to load provider data");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  // Transform API response to match Provider interface
  const providerData: Provider | null = apiUser && apiUser.courseProvider
    ? {
        courseProvider: apiUser.courseProvider,
        user: {
          id: apiUser.id,
          firstName: apiUser.firstName,
          lastName: apiUser.lastName,
          email: apiUser.email,
          phoneNumber: apiUser.phoneNumber,
          address: apiUser.address,
          role: apiUser.role,
          roleId: apiUser.roleId,
          createdAt: apiUser.createdAt,
          updatedAt: apiUser.updatedAt,
          validated: apiUser.validated,
          isSubscriber: apiUser.isSubscriber,
          subscriptionTier: apiUser.subscriptionTier,
        },
        profile: apiUser.profile || undefined,
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 mt-20">
        <p className="text-center mt-10 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 mt-20">
        <p className="text-center mt-10 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {providerData ? (
        <TrainingProfileCard provider={providerData} />
      ) : (
        <p className="text-center mt-10 text-gray-600">No provider data found.</p>
      )}
    </div>
  );
}






// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';

// import TrainingProfileCard from '@/sections/components/Public Profile/TrainingProfileCard';

// export default function ProviderPage() {
//   const params = useParams();
//   const id = params?.id as string | undefined;
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     const fetchProvider = async () => {
//       try {
//         const token = localStorage.getItem('authToken')?.replace(/^"|"$/g, '');
//         const response = await axios.get(
//           `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/auth/get-user/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log('Provider Data:', response.data);
//         setProvider(response.data);
//       } catch (error) {
//         console.error('Failed to fetch provider:', error);
//       }
//     };

//     if (id) fetchProvider();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-gray-100 mt-20">
//       {provider ? (
//         <TrainingProfileCard provider={provider} />
//       ) : (
//         <p className="text-center mt-10">Loading...</p>
//       )}
//     </div>
//   );
// }
