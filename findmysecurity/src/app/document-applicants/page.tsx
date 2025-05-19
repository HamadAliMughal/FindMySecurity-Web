"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/path";

interface DocumentRequest {
  id: number;
  requesterId: number;
  documentOwnerId: number;
  documentUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  requester: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
}

const ITEMS_PER_PAGE = 5;

const DocumentApplicantsPage = () => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchRequests = async () => {
    try {
      const stored = localStorage.getItem("loginData");
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!stored || !token) {
        toast.error("User not authenticated");
        return;
      }

      const { id: documentOwnerId } = JSON.parse(stored);

      const response = await axios.get(
        `${API_URL}/document-access-requests/posted-by/${documentOwnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data?.data)) {
        setRequests(response.data.data);
        setFilteredRequests(response.data.data);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch document access requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRequests(requests);
    } else {
      const searchTerm = search.toLowerCase();
      const searchId = parseInt(search.trim(), 10);
      const matches = requests.filter(
        (req) =>
          req.documentUrl.toLowerCase().includes(searchTerm) ||
          (!isNaN(searchId) && req.id === searchId)
      );
      setFilteredRequests(matches);
      setCurrentPage(1);
    }
  }, [search, requests]);

  // Group by document URL
  const grouped = filteredRequests.reduce((acc: Record<string, DocumentRequest[]>, req) => {
    const docName = extractDocumentName(req.documentUrl) || "Unnamed Document";
    if (!acc[docName]) acc[docName] = [];
    acc[docName].push(req);
    return acc;
  }, {});

  const paginatedEntries = Object.entries(grouped).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(Object.keys(grouped).length / ITEMS_PER_PAGE);

  const handleUpdateStatus = async (requestId: number, status: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) return;

      await axios.put(
        `${API_URL}/document-access-requests/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Access request ${status}`);
      fetchRequests(); // Refresh the data
    } catch {
      toast.error("Failed to update access request status");
    }
  };

  // Helper function to extract document name from URL
  const extractDocumentName = (url: string) => {
    if (typeof url !== "string") return null;
    const parts = url.split("/");
    const fileNameWithExt = decodeURIComponent(parts.pop() || "");
    const namePart = fileNameWithExt.split("-").slice(1).join("-").split(".").slice(0, -1).join(".");
    return namePart || null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-20 text-black bg-white min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-700 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Document Access Requests</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Request ID or Document Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : paginatedEntries.length === 0 ? (
        <p className="text-center">No document access requests found.</p>
      ) : (
        paginatedEntries.map(([docName, requests]) => (
          <div key={docName} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {docName}
            </h2>
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="border rounded-md p-4 shadow-sm bg-white flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">Request ID:</span> {req.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Requester Name:</span>{" "}
                      {req?.requester?.firstName || ""}{" "}
                      {req?.requester?.lastName || ""}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`${
                          req.status === "approved"
                            ? "text-green-600"
                            : req.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } font-medium`}
                      >
                        {req.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Requested on: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "approved")}
                          className="bg-black text-white px-3 py-1 rounded hover:opacity-80"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "rejected")}
                          className="bg-black text-white px-3 py-1 rounded hover:opacity-80"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => router.push(`/public-profile/${req.requesterId}`)}
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

export default DocumentApplicantsPage;