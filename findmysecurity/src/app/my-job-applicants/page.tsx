"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/path";

interface Application {
  id: number;
  userId: number;
  postedBy: number;
  serviceAdId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  securityProfessional: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  serviceAd: {
    jobTitle: string;
    description: string;
  };
}

const ITEMS_PER_PAGE = 5;

const JobApplicantAdsPage = () => {
  const [ads, setAds] = useState<Application[]>([]);
  const [filteredAds, setFilteredAds] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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
        setFilteredAds(response.data.data);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch job applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredAds(ads);
    } else {
      const searchTerm = search.toLowerCase();
      const searchId = parseInt(search.trim(), 10);
      const matches = ads.filter(
        (app) =>
          app.serviceAd.jobTitle.toLowerCase().includes(searchTerm) ||
          (!isNaN(searchId) && app.serviceAdId === searchId)
      );
      setFilteredAds(matches);
      setCurrentPage(1);
    }
  }, [search, ads]);

  // 🔸 Group by job title now
  const grouped = filteredAds.reduce((acc: Record<string, Application[]>, app) => {
    const title = app.serviceAd?.jobTitle || "Untitled Job";
    if (!acc[title]) acc[title] = [];
    acc[title].push(app);
    return acc;
  }, {});

  const paginatedEntries = Object.entries(grouped).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(Object.keys(grouped).length / ITEMS_PER_PAGE);

  const handleUpdateStatus = async (appId: number, status: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) return;

      await axios.put(
        `${API_URL}/job-applications/${appId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Application ${status}`);
      fetchAds(); // Refresh the data
    } catch {
      toast.error("Failed to update application status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-20 text-black bg-white min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-700 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Job Applications</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Service Ad ID or Job Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : paginatedEntries.length === 0 ? (
        <p className="text-center">No job applications found.</p>
      ) : (
        paginatedEntries.map(([jobTitle, applications]) => (
          <div key={jobTitle} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {jobTitle}
            </h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-md p-4 shadow-sm bg-white flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">Application ID:</span> {app.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Applicant Name:</span>{" "}
                      {app?.securityProfessional?.firstName || ""}{" "}
                      {app?.securityProfessional?.lastName || ""}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`${
                          app.status === "approved"
                            ? "text-green-600"
                            : app.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } font-medium`}
                      >
                        {app.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied on: {new Date(app.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(app.id, "approved")}
                          className="bg-black text-white px-3 py-1 rounded hover:opacity-80"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, "rejected")}
                          className="bg-black text-white px-3 py-1 rounded hover:opacity-80"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => router.push(`/public-profile/${app.userId}`)}
                      className="bg-black text-white px-3 py-1 rounded hover:opacity-80"
                    >
                      Show Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Previous
          </button>
          <span className="py-2 px-4 border rounded bg-black text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobApplicantAdsPage;
