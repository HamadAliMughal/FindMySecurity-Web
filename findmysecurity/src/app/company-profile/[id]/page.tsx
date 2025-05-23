"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CompanyProfileCard from "@/sections/components/Public Profile/CompanyProfileCard";
import { API_URL } from "@/utils/path";


// Define interfaces based on API response
interface Permissions {
  acceptTerms: boolean;
  acceptEmails: boolean;
  premiumServiceNeed: boolean;
}

interface SecurityCompany {
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
  securityCompany: SecurityCompany;
  profile: { profilePhoto?: string } | null;
}

interface Company {
  securityCompany: SecurityCompany;
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
 * Fetches company data by ID and renders the CompanyProfileCard.
 */
export default function UserPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("No company ID provided");
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
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Transform API response to match Company interface
  const companyData: Company | null = user
    ? {
        securityCompany: user.securityCompany,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
          roleId: user.roleId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          validated: user.validated,
          isSubscriber: user.isSubscriber,
          subscriptionTier: user.subscriptionTier,
        },
        profile: user.profile || undefined,
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
      {companyData ? (
        <CompanyProfileCard company={companyData} />
      ) : (
        <p className="text-center mt-10 text-gray-600">No company data found.</p>
      )}
    </div>
  );
}






// // pages/user/[id].js
// 'use client';
// import { useEffect , useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';



// import CompanyProfileCard from "@/sections/components/Public Profile/CompanyProfileCard";


// export default function UserPage() {
//   const params = useParams();
//   const id = params?.id as string | undefined;
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
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
//         console.log('User Data:', response.data);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//       }
//     };

//     if (id) fetchUser();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-gray-100 mt-20">
//       {user ? <CompanyProfileCard company={user} /> : <p className="text-center mt-10">Loading...</p>}
//     </div>
//   );
// }
