"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/utils/path";

interface JobApplication {
  id: number;
  jobTitle: string;
  applicantName: string;
  status: string;
  createdAt: string;
}

const JobApplicantAdsPage = () => {
  const [ads, setAds] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const stored = localStorage.getItem("loginData");
        const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
        if (!stored || !token) {
          toast.error("User not authenticated");
          return;
        }

        const { id: postedBy } = JSON.parse(stored);

        const response = await axios.get(
          `${API_URL}/job-applications/posted-by/${postedBy}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data?.data)) {
          setAds(response.data.data);
        } else {
          toast.error("Unexpected response format");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch job applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Job Applicants</h1>
      {loading ? (
        <p>Loading...</p>
      ) : ads.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border border-gray-200 p-4 rounded shadow-sm"
            >
              <h2 className="text-lg font-semibold">{ad.jobTitle}</h2>
              <p className="text-sm text-gray-600">Applicant: {ad.applicantName}</p>
              <p className="text-sm text-gray-600">Status: {ad.status}</p>
              <p className="text-xs text-gray-500">Applied on: {new Date(ad.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplicantAdsPage;
