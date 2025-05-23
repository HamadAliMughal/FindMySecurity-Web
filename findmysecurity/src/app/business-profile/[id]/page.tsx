"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CorporateClientProfileCard from "@/sections/components/Public Profile/CorporateClientProfileCard";
import { API_URL } from "@/utils/path";

// Define interfaces based on API response
interface Permissions {
  acceptTerms: boolean;
  acceptEmails: boolean;
  premiumServiceNeed: boolean;
}

interface CorporateClient {
  id: number;
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  registrationNumber: string;
  website: string;
  industryType: string[];
  serviceNeeds: string[];
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
  corporateClient: CorporateClient;
  profile: { profilePhoto?: string } | null;
}

interface Client {
  corporateClient: CorporateClient;
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
 * Fetches corporate client data by ID and renders the CorporateClientProfileCard.
 */
export default function ClientPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!id) {
        setError("No client ID provided");
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
        console.log("Client Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch client:", error);
        setError("Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  // Transform API response to match Client interface
  const clientData: Client | null = user
    ? {
        corporateClient: user.corporateClient,
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
      {clientData ? (
        <CorporateClientProfileCard client={clientData} />
      ) : (
        <p className="text-center mt-10 text-gray-600">No client data found.</p>
      )}
    </div>
  );
}