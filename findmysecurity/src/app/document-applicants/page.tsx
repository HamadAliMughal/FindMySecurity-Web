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
  documentUrl: string | null;
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

/**
 * Displays a paginated list of document access requests with filters for Request ID and Status.
 */
const DocumentApplicantsPage = () => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [requestIdSearch, setRequestIdSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const stored = localStorage.getItem("loginData");
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!stored || !token) {
        toast.error("User not authenticated");
        router.push("/login");
        return;
      }

      const { id: documentOwnerId } = JSON.parse(stored);

      const response = await axios.get(
        `${API_URL}/document/user/${documentOwnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data); // Debug log

      // Handle various response formats
      let data: DocumentRequest[] = [];
      if (Array.isArray(response.data?.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data?.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data?.documents)) {
        data = response.data.documents;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data?.data === null || response.data?.data === undefined) {
        data = [];
      } else {
        throw new Error("Unexpected response format");
      }

      // Validate and sanitize data
      const validData = data.filter((req) => {
        if (!req.id || !req.status || !req.createdAt || !req.updatedAt) {
          console.warn("Invalid request object:", req);
          return false;
        }
        return true;
      }).map((req) => ({
        ...req,
        documentUrl: req.documentUrl ?? "Unnamed Document", // Fallback for null/undefined
      }));

      console.log("Validated doc applicants data:", validData);
      setRequests(validData);
      setFilteredRequests(validData);
    } catch (error: any) {
      console.error("Fetch error:", error);
      const message =
        error.response?.status === 401
          ? "Authentication failed. Please log in again."
          : error.response?.status === 404
          ? "No document access requests found."
          : error.message || "Failed to fetch document access requests";
      setError(message);
      toast.error(message);
      setRequests([]);
      setFilteredRequests([]);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let matches = requests;

    // Apply Request ID filter
    if (requestIdSearch.trim() !== "") {
      const searchId = parseInt(requestIdSearch.trim(), 10);
      if (!isNaN(searchId)) {
        matches = matches.filter((req) => req.id === searchId);
      } else {
        matches = []; // Invalid ID input
      }
    }

    // Apply Status filter
    if (statusFilter !== "all") {
      matches = matches.filter((req) => req.status === statusFilter);
    }

    setFilteredRequests(matches);
    setCurrentPage(1); // Reset to first page on filter change
  }, [requestIdSearch, statusFilter, requests]);

  const handleUpdateStatus = async (requestId: number, status: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast.error("User not authenticated");
        router.push("/login");
        return;
      }

      await axios.put(
        `${API_URL}/document-access-requests/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Access request ${status}`);
      fetchRequests();
    } catch (error: any) {
      toast.error("Failed to update access request status");
      console.error(error);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast.error("User not authenticated");
      router.push("/login");
      setIsClearing(false);
      return;
    }

    try {
      await Promise.all(
        requests.map((req) =>
          axios.delete(`${API_URL}/document-access-requests/${req.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.success("All document access requests cleared");
      setRequests([]);
      setFilteredRequests([]);
    } catch (err) {
      toast.error("Failed to clear document access requests");
      console.error(err);
    } finally {
      setIsClearing(false);
    }
  };

  const extractDocumentName = (url: string | null) => {
    if (typeof url !== "string" || !url) return "Unnamed Document";
    const parts = url.split("/");
    const fileNameWithExt = decodeURIComponent(parts.pop() || "Unnamed Document");
    const namePart = fileNameWithExt.split("-").slice(1).join("-").split(".").slice(0, -1).join(".");
    return namePart || "Unnamed Document";
  };

  const resetFilters = () => {
    setRequestIdSearch("");
    setStatusFilter("all");
    setFilteredRequests(requests);
    setCurrentPage(1);
  };

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-20 text-black bg-white rounded-lg shadow-lg min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-700 hover:underline"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Document Access Requests</h1>
        {requests.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Clear All"}
          </button>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="requestIdSearch" className="block text-sm font-medium text-gray-700 mb-1">
            Request ID
          </label>
          <input
            id="requestIdSearch"
            type="text"
            placeholder="Enter Request ID"
            value={requestIdSearch}
            onChange={(e) => setRequestIdSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={resetFilters}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Reset Filters
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRequests}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : paginatedEntries.length === 0 ? (
        <p className="text-center text-gray-500">No document access requests found.</p>
      ) : (
        paginatedEntries.map(([docName, requests]) => (
          <div key={docName} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">{docName}</h2>
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="border rounded-md p-4 shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">Request ID:</span> {req.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Requester Name:</span>{" "}
                      {req.requester?.firstName || "N/A"} {req.requester?.lastName || ""}
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
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Requested on: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "approved")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => router.push(`/public-profile/${req.requesterId}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

      {totalPages > 1 && !error && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="py-2 px-4 border rounded bg-black text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentApplicantsPage;







// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/utils/path";

// interface DocumentRequest {
//   id: number;
//   requesterId: number;
//   documentOwnerId: number;
//   documentUrl: string | null;
//   status: "pending" | "approved" | "rejected";
//   createdAt: string;
//   updatedAt: string;
//   requester: {
//     firstName: string;
//     lastName: string;
//     profileImage: string;
//   };
// }

// const ITEMS_PER_PAGE = 5;

// /**
//  * Displays a paginated list of document access requests with search and actions.
//  */
// const DocumentApplicantsPage = () => {
//   const [requests, setRequests] = useState<DocumentRequest[]>([]);
//   const [filteredRequests, setFilteredRequests] = useState<DocumentRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isClearing, setIsClearing] = useState(false);
//   const [search, setSearch] = useState(""); // Document name search
//   const [requestIdSearch, setRequestIdSearch] = useState(""); // Request ID search
//   const [statusFilter, setStatusFilter] = useState("all"); // Status filter
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchRequests = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const stored = localStorage.getItem("loginData");
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!stored || !token) {
//         toast.error("User not authenticated");
//         router.push("/login");
//         return;
//       }

//       const { id: documentOwnerId } = JSON.parse(stored);

//       const response = await axios.get(
//         `${API_URL}/document/user/${documentOwnerId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("API Response:", response.data); // Debug log

//       // Handle various response formats
//       let data: DocumentRequest[] = [];
//       if (Array.isArray(response.data?.data)) {
//         data = response.data.data;
//       } else if (Array.isArray(response.data?.results)) {
//         data = response.data.results;
//       } else if (Array.isArray(response.data?.documents)) {
//         data = response.data.documents;
//       } else if (Array.isArray(response.data)) {
//         data = response.data;
//       } else if (response.data?.data === null || response.data?.data === undefined) {
//         data = [];
//       } else {
//         throw new Error("Unexpected response format");
//       }

//       // Validate and sanitize data
//       const validData = data.filter((req) => {
//         if (!req.id || !req.status || !req.createdAt || !req.updatedAt) {
//           console.warn("Invalid request object:", req);
//           return false;
//         }
//         return true;
//       }).map((req) => ({
//         ...req,
//         documentUrl: req.documentUrl ?? "Unnamed Document", // Fallback for null/undefined
//       }));

//       console.log("Validated doc applicants data:", validData);
//       setRequests(validData);
//       setFilteredRequests(validData);
//     } catch (error: any) {
//       console.error("Fetch error:", error);
//       const message =
//         error.response?.status === 401
//           ? "Authentication failed. Please log in again."
//           : error.response?.status === 404
//           ? "No document access requests found."
//           : error.message || "Failed to fetch document access requests";
//       setError(message);
//       toast.error(message);
//       setRequests([]);
//       setFilteredRequests([]);
//       if (error.response?.status === 401) {
//         router.push("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   useEffect(() => {
//     let matches = requests;

//     // Apply Request ID filter
//     if (requestIdSearch.trim() !== "") {
//       const searchId = parseInt(requestIdSearch.trim(), 10);
//       if (!isNaN(searchId)) {
//         matches = matches.filter((req) => req.id === searchId);
//       } else {
//         matches = []; // Invalid ID input
//       }
//     }

//     // Apply Status filter
//     if (statusFilter !== "all") {
//       matches = matches.filter((req) => req.status === statusFilter);
//     }

//     // Apply Document Name search
//     if (search.trim() !== "") {
//       const searchTerm = search.toLowerCase();
//       matches = matches.filter(
//         (req) =>
//           req.documentUrl &&
//           typeof req.documentUrl === "string" &&
//           req.documentUrl.toLowerCase().includes(searchTerm)
//       );
//     }

//     setFilteredRequests(matches);
//     setCurrentPage(1); // Reset to first page on filter change
//   }, [search, requestIdSearch, statusFilter, requests]);

//   const handleUpdateStatus = async (requestId: number, status: "approved" | "rejected") => {
//     try {
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!token) {
//         toast.error("User not authenticated");
//         router.push("/login");
//         return;
//       }

//       await axios.put(
//         `${API_URL}/document-access-requests/${requestId}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success(`Access request ${status}`);
//       fetchRequests();
//     } catch (error: any) {
//       toast.error("Failed to update access request status");
//       console.error(error);
//     }
//   };

//   const handleClearAll = async () => {
//     setIsClearing(true);
//     const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//     if (!token) {
//       toast.error("User not authenticated");
//       router.push("/login");
//       setIsClearing(false);
//       return;
//     }

//     try {
//       await Promise.all(
//         requests.map((req) =>
//           axios.delete(`${API_URL}/document-access-requests/${req.id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         )
//       );
//       toast.success("All document access requests cleared");
//       setRequests([]);
//       setFilteredRequests([]);
//     } catch (err) {
//       toast.error("Failed to clear document access requests");
//       console.error(err);
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   const extractDocumentName = (url: string | null) => {
//     if (typeof url !== "string" || !url) return "Unnamed Document";
//     const parts = url.split("/");
//     const fileNameWithExt = decodeURIComponent(parts.pop() || "Unnamed Document");
//     const namePart = fileNameWithExt.split("-").slice(1).join("-").split(".").slice(0, -1).join(".");
//     return namePart || "Unnamed Document";
//   };

//   const resetFilters = () => {
//     setSearch("");
//     setRequestIdSearch("");
//     setStatusFilter("all");
//     setFilteredRequests(requests);
//     setCurrentPage(1);
//   };

//   const grouped = filteredRequests.reduce((acc: Record<string, DocumentRequest[]>, req) => {
//     const docName = extractDocumentName(req.documentUrl) || "Unnamed Document";
//     if (!acc[docName]) acc[docName] = [];
//     acc[docName].push(req);
//     return acc;
//   }, {});

//   const paginatedEntries = Object.entries(grouped).slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const totalPages = Math.ceil(Object.keys(grouped).length / ITEMS_PER_PAGE);

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-20 text-black bg-white rounded-lg shadow-lg min-h-screen">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 text-sm text-gray-700 hover:underline"
//       >
//         ← Back
//       </button>

//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-center">Document Access Requests</h1>
//         {requests.length > 0 && (
//           <button
//             onClick={handleClearAll}
//             className="text-sm text-red-600 hover:underline disabled:opacity-50"
//             disabled={isClearing}
//           >
//             {isClearing ? "Clearing..." : "Clear All"}
//           </button>
//         )}
//       </div>

//       <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div>
//           <label htmlFor="requestIdSearch" className="block text-sm font-medium text-gray-700 mb-1">
//             Request ID
//           </label>
//           <input
//             id="requestIdSearch"
//             type="text"
//             placeholder="Enter Request ID"
//             value={requestIdSearch}
//             onChange={(e) => setRequestIdSearch(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>
//         <div>
//           <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
//             Status
//           </label>
//           <select
//             id="statusFilter"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="documentSearch" className="block text-sm font-medium text-gray-700 mb-1">
//             Document Name
//           </label>
//           <input
//             id="documentSearch"
//             type="text"
//             placeholder="Search by Document Name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>
//       </div>

//       <div className="mb-6 text-center">
//         <button
//           onClick={resetFilters}
//           className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchRequests}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       ) : paginatedEntries.length === 0 ? (
//         <p className="text-center text-gray-500">No document access requests found.</p>
//       ) : (
//         paginatedEntries.map(([docName, requests]) => (
//           <div key={docName} className="mb-10">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">{docName}</h2>
//             <div className="space-y-4">
//               {requests.map((req) => (
//                 <div
//                   key={req.id}
//                   className="border rounded-md p-4 shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//                 >
//                   <div>
//                     <p className="text-sm">
//                       <span className="font-semibold">Request ID:</span> {req.id}
//                     </p>
//                     <p className="text-sm">
//                       <span className="font-semibold">Requester Name:</span>{" "}
//                       {req.requester?.firstName || "N/A"} {req.requester?.lastName || ""}
//                     </p>
//                     <p className="text-sm">
//                       <span className="font-semibold">Status:</span>{" "}
//                       <span
//                         className={`${
//                           req.status === "approved"
//                             ? "text-green-600"
//                             : req.status === "rejected"
//                             ? "text-red-600"
//                             : "text-yellow-600"
//                         } font-medium`}
//                       >
//                         {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Requested on: {new Date(req.createdAt).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-2">
//                     {req.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => handleUpdateStatus(req.id, "approved")}
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => handleUpdateStatus(req.id, "rejected")}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => router.push(`/public-profile/${req.requesterId}`)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Show Profile
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}

//       {totalPages > 1 && !error && (
//         <div className="flex justify-center mt-8 gap-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
//           >
//             Previous
//           </button>
//           <span className="py-2 px-4 border rounded bg-black text-white">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentApplicantsPage;






// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/utils/path";

// interface DocumentRequest {
//   id: number;
//   requesterId: number;
//   documentOwnerId: number;
//   documentUrl: string;
//   status: "pending" | "approved" | "rejected";
//   createdAt: string;
//   updatedAt: string;
//   requester: {
//     firstName: string;
//     lastName: string;
//     profileImage: string;
//   };
// }

// const ITEMS_PER_PAGE = 5;

// /**
//  * Displays a paginated list of document access requests with search and actions.
//  */
// const DocumentApplicantsPage = () => {
//   const [requests, setRequests] = useState<DocumentRequest[]>([]);
//   const [filteredRequests, setFilteredRequests] = useState<DocumentRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isClearing, setIsClearing] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchRequests = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const stored = localStorage.getItem("loginData");
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!stored || !token) {
//         toast.error("User not authenticated");
//         router.push("/login");
//         return;
//       }

//       const { id: documentOwnerId } = JSON.parse(stored);

//       const response = await axios.get(
//         `${API_URL}/document/user/${documentOwnerId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("API Response:", response.data); // Debug log

//       // Handle various response formats
//       let data: DocumentRequest[] = [];
//       if (Array.isArray(response.data?.data)) {
//         data = response.data.data;
//       } else if (Array.isArray(response.data?.results)) {
//         data = response.data.results;
//       } else if (Array.isArray(response.data?.documents)) {
//         data = response.data.documents;
//       } else if (Array.isArray(response.data)) {
//         data = response.data;
//       } else if (response.data?.data === null || response.data?.data === undefined) {
//         data = [];
//       } else {
//         throw new Error("Unexpected response format");
//       }
//       console.log("doc applicants data",data)
//       setRequests(data);
//       setFilteredRequests(data);
//     } catch (error: any) {
//       console.error("Fetch error:", error);
//       const message =
//         error.response?.status === 401
//           ? "Authentication failed. Please log in again."
//           : error.response?.status === 404
//           ? "No document access requests found."
//           : error.message || "Failed to fetch document access requests";
//       setError(message);
//       toast.error(message);
//       setRequests([]);
//       setFilteredRequests([]);
//       if (error.response?.status === 401) {
//         router.push("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   useEffect(() => {
//     if (search.trim() === "") {
//       setFilteredRequests(requests);
//     } else {
//       const searchTerm = search.toLowerCase();
//       const searchId = parseInt(search.trim(), 10);
//       const matches = requests.filter(
//         (req) =>
//           req.documentUrl.toLowerCase().includes(searchTerm) ||
//           (!isNaN(searchId) && req.id === searchId)
//       );
//       setFilteredRequests(matches);
//       setCurrentPage(1);
//     }
//   }, [search, requests]);

//   const handleUpdateStatus = async (requestId: number, status: "approved" | "rejected") => {
//     try {
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!token) {
//         toast.error("User not authenticated");
//         router.push("/login");
//         return;
//       }

//       await axios.put(
//         `${API_URL}/document/user/${requestId}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success(`Access request ${status}`);
//       fetchRequests();
//     } catch (error: any) {
//       toast.error("Failed to update access request status");
//       console.error(error);
//     }
//   };

//   const handleClearAll = async () => {
//     setIsClearing(true);
//     const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//     if (!token) {
//       toast.error("User not authenticated");
//       router.push("/login");
//       setIsClearing(false);
//       return;
//     }

//     try {
//       await Promise.all(
//         requests.map((req) =>
//           axios.delete(`${API_URL}/document/user/${req.id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         )
//       );
//       toast.success("All document access requests cleared");
//       setRequests([]);
//       setFilteredRequests([]);
//     } catch (err) {
//       toast.error("Failed to clear document access requests");
//       console.error(err);
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   const extractDocumentName = (url: string) => {
//     if (typeof url !== "string") return "Unnamed Document";
//     const parts = url.split("/");
//     const fileNameWithExt = decodeURIComponent(parts.pop() || "Unnamed Document");
//     const namePart = fileNameWithExt.split("-").slice(1).join("-").split(".").slice(0, -1).join(".");
//     return namePart || "Unnamed Document";
//   };

//   const grouped = filteredRequests.reduce((acc: Record<string, DocumentRequest[]>, req) => {
//     const docName = extractDocumentName(req.documentUrl) || "Unnamed Document";
//     if (!acc[docName]) acc[docName] = [];
//     acc[docName].push(req);
//     return acc;
//   }, {});

//   const paginatedEntries = Object.entries(grouped).slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const totalPages = Math.ceil(Object.keys(grouped).length / ITEMS_PER_PAGE);

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-20 text-black bg-white rounded-lg shadow-lg min-h-screen">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 text-sm text-gray-700 hover:underline"
//       >
//         ← Back
//       </button>

//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-center">Document Access Requests</h1>
//         {requests.length > 0 && (
//           <button
//             onClick={handleClearAll}
//             className="text-sm text-red-600 hover:underline disabled:opacity-50"
//             disabled={isClearing}
//           >
//             {isClearing ? "Clearing..." : "Clear All"}
//           </button>
//         )}
//       </div>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Request ID or Document Name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full border px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchRequests}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       ) : paginatedEntries.length === 0 ? (
//         <p className="text-center text-gray-500">No document access requests found.</p>
//       ) : (
//         paginatedEntries.map(([docName, requests]) => (
//           <div key={docName} className="mb-10">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">Document Applicants</h2>
//             <div className="space-y-4">
//               {requests.map((req) => (
//                 <div
//                   key={req.id}
//                   className="border rounded-md p-4 shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//                 >
//                   <div>
//                     <p className="text-sm">
//                       <span className="font-semibold">Request ID:</span> {req.id}
//                     </p>
//                     {/* <p className="text-sm">
//                       <span className="font-semibold">Requester Name:</span>{" "}
//                       {req?.requester?.firstName || ""} {req?.requester?.lastName || ""}
//                     </p> */}
//                     <p className="text-sm">
//                       <span className="font-semibold">Status:</span>{" "}
//                       <span
//                         className={`${
//                           req.status === "approved"
//                             ? "text-green-600"
//                             : req.status === "rejected"
//                             ? "text-red-600"
//                             : "text-yellow-600"
//                         } font-medium`}
//                       >
//                         {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Requested on: {new Date(req.createdAt).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-2">
//                     {req.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => handleUpdateStatus(req.id, "approved")}
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => handleUpdateStatus(req.id, "rejected")}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => router.push(`/public-profile/${req.requesterId}`)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Show Profile
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}

//       {totalPages > 1 && !error && (
//         <div className="flex justify-center mt-8 gap-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
//           >
//             Previous
//           </button>
//           <span className="py-2 px-4 border rounded bg-black text-white">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             className="px-4 py-2 border rounded disabled:opacity-40 hover:bg-gray-100"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentApplicantsPage;