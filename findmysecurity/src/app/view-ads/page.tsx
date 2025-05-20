"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBriefcase,
  FaTag,
} from "react-icons/fa";
import toast from "react-hot-toast";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";
import { ArrowLeft } from "lucide-react";

const DEFAULT_KEYWORD = "Security Guard";
const DEFAULT_LOCATION = "London";
const DEFAULT_RATE = 30000;

const PostAdLister: React.FC = () => {
  const router = useRouter();

  const [localJobs, setLocalJobs] = useState<any[]>([]);
  const [adzunaJobs, setAdzunaJobs] = useState<any[]>([]);
  const [monsterJobs, setMonsterJobs] = useState<any[]>([]);
  const [securityJobs, setSecurityJobs] = useState<any[]>([]);
  const [reedJobs, setReedJobs] = useState<any[]>([]);


  const [keyword, setKeyword] = useState(DEFAULT_KEYWORD);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [rateFilter, setRateFilter] = useState<number | null>(DEFAULT_RATE);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const isClient = typeof window !== "undefined";

  const fetchLocalJobs = (kw: string, loc: string, rate: number | null) => {
    if (!isClient) return [];
    const storedData = localStorage.getItem("jobs");
    if (!storedData) return [];
    const parsed = JSON.parse(storedData);

    return parsed.filter((post: any) => {
      const matchTitle = kw ? post.title?.toLowerCase().includes(kw.toLowerCase()) : true;
      const matchLocation = loc ? post.location?.toLowerCase().includes(loc.toLowerCase()) : true;
      const matchRate = rate !== null ? parseFloat(post.payRate) <= rate : true;
      return matchTitle && matchLocation && matchRate;
    });
  };

  const fetchSecurityJobs = async (): Promise<{ jobs: any[]; userId: any; token: string | undefined }> => {
    if (!isClient) return { jobs: [], userId: null, token: undefined };

    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
    const storedData = localStorage.getItem('loginData');
    const data = storedData ? JSON.parse(storedData) : null;
    const currentId = data?.id || data?.user?.id;

    try {
      const res = await axios.get("https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/security-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { jobs: res.data.jobs, userId: currentId, token };
    } catch (err) {
      console.error("Security Jobs API Error:", err);
      return { jobs: [], userId: null, token };
    }
  };

  const applyForJob = async (serviceAdId: number) => {
    if (!isClient) return;
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
    const storedData = localStorage.getItem('loginData');
    const data = storedData ? JSON.parse(storedData) : null;
    const currentId = data?.id || data?.user?.id;

    try {
      const response = await axios.post(
        "https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/job-applications",
        {
          userId: currentId as number,
          serviceAdId,
          status: "pending"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
    
      if (response.status === 200 || response.status === 201) {
        toast.success("Applied successfully!");
      } else {
        toast.error(response.data?.message || "Error during apply");
      }
    
      return response.data;
    
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data?.message || "Bad request.");
      } else {
        toast.error(error.message || "Job application failed. Please try again.");
      }
    }
  }    

  const handleSearch = async () => {
    if (!isClient) return;

    setSearched(true);
    setLoading(true);
    try {
      const [adzunaRes, monsterRes,reedRes, securityRes] = await Promise.all([
        fetch(`/api/reed-job?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`),
        fetch(`/api/monster-job?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`),
        fetch(`/api/reed?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`),
        fetchSecurityJobs(),
      ]);

      const [adzunaData, monsterData, reedData] = await Promise.all([
        adzunaRes.json(),
        monsterRes.json(),
        reedRes.json(),
      ]);

      setAdzunaJobs(adzunaRes.ok ? adzunaData : []);
      setMonsterJobs(monsterRes.ok ? monsterData : []);
      setReedJobs(reedRes.ok ? reedData?.results || [] : []);
      setSecurityJobs(securityRes.jobs || []);

      const filteredLocal = fetchLocalJobs(keyword, location, rateFilter);
      setLocalJobs(filteredLocal);
      setCurrentPage(1);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      handleSearch();
    }
  }, []);

  const mergedJobs = [
    ...securityJobs.map((j) => ({ ...j, source: "Find My Security" })),
    ...localJobs.map((j) => ({ ...j, source: "local" })),
    ...adzunaJobs.map((j) => ({ ...j, source: "adzuna" })),
    ...monsterJobs.map((j) => ({ ...j, source: "monster" })),
    ...reedJobs.map((j) => ({ ...j, source: "reed" })),
  ];
  

  const totalPages = Math.ceil(mergedJobs.length / pageSize);
  const paginatedJobs = mergedJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-6 md:px-32">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Posted <span className="text-black">Job Ads</span>
      </h1>
      <button
        className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <div>
          <label className="text-sm font-semibold">Keyword</label>
          <div className="flex items-center space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Security"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Location</label>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Max Pay Rate</label>
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave className="text-gray-500" />
            <input
              type="number"
              value={rateFilter ?? ""}
              onChange={(e) => setRateFilter(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="e.g. 30000"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Search Jobs
          </button>
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : mergedJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found for the current filters.</p>
      ) : (
        <>
        <AnimateOnScrollProvider>
          {paginatedJobs.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"  data-aos="fade-up">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaBriefcase className="text-white text-3xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.title || post.jobTitle}
                    </h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
                      <p><strong>Location:</strong> {post.location || post.jobLocation}</p>
                      <p><strong>Pay:</strong> ${post.payRate || post.salaryRate || post.JobSalary}</p>
                      <p className="col-span-2"><strong>Description:</strong> {post.description || post.jobDescription}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {post.source === "local" || post.source === "security-api" ? (
                    <button
                      onClick={() => applyForJob(post.id)}
                      className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  ) : (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Visit
                    </a>
                  )}
                  <span className="flex items-center bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
                    <FaTag className="mr-1" />
                    {post.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
</AnimateOnScrollProvider>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
                }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostAdLister;




// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   FaSearch,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaTag,
// } from "react-icons/fa";

// const DEFAULT_KEYWORD = "Security Guard";
// const DEFAULT_LOCATION = "London";
// const DEFAULT_RATE = 30000;

// const PostAdLister: React.FC = () => {
//   const router = useRouter();

//   const [localJobs, setLocalJobs] = useState<any[]>([]);
//   const [adzunaJobs, setAdzunaJobs] = useState<any[]>([]);
//   const [monsterJobs, setMonsterJobs] = useState<any[]>([]);
//   const [securityJobs, setSecurityJobs] = useState<any[]>([]);

//   const [keyword, setKeyword] = useState(DEFAULT_KEYWORD);
//   const [location, setLocation] = useState(DEFAULT_LOCATION);
//   const [rateFilter, setRateFilter] = useState<number | null>(DEFAULT_RATE);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;

//   const fetchLocalJobs = (kw: string, loc: string, rate: number | null) => {
//     const storedData = localStorage.getItem("jobs");
//     if (!storedData) return [];
//     const parsed = JSON.parse(storedData);

//     return parsed.filter((post: any) => {
//       const matchTitle = kw ? post.title?.toLowerCase().includes(kw.toLowerCase()) : true;
//       const matchLocation = loc ? post.location?.toLowerCase().includes(loc.toLowerCase()) : true;
//       const matchRate = rate !== null ? parseFloat(post.payRate) <= rate : true;
//       return matchTitle && matchLocation && matchRate;
//     });
//   };


//   const token2 = localStorage.getItem("authToken")?.replace(/^"|"$/g, '')
//   const storedData1 = localStorage.getItem('loginData')
//   const data1 = storedData1 ? JSON.parse(storedData1) : null; 
//   const currentId = data1?.id || data1?.user?.id; // Replace with your actual token
//   const fetchSecurityJobs = async () => {
//     try {
  
//       const res = await axios.get("https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/security-jobs", {
//         headers: {
//           Authorization: `Bearer ${token2}`,
//         },
//       });
  
//       return res.data.jobs;
//     } catch (err) {
//       console.error("Security Jobs API Error:", err);
//       return [];
//     }
//   };
  
//   const applyForJob = async ( serviceAdId: number) => {
//     try {
//       const response = await axios.post(
//         "https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev//job-applications",
//         {
//           userId: currentId,
//           serviceAdId,
//           status: "pending"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token2}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error("Job application failed:", error.response?.data || error.message);
//       throw error;
//     }
//   };
//   const handleSearch = async () => {
//     setSearched(true);
//     setLoading(true);
//     try {
//       const [adzunaRes, monsterRes, securityJobsData] = await Promise.all([
//         fetch(`/api/reed-job?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`),
//         fetch(`/api/monster-job?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`),
//         fetchSecurityJobs(),
//       ]);

//       const [adzunaData, monsterData] = await Promise.all([
//         adzunaRes.json(),
//         monsterRes.json(),
//       ]);

//       setAdzunaJobs(adzunaRes.ok ? adzunaData : []);
//       setMonsterJobs(monsterRes.ok ? monsterData : []);
//       setSecurityJobs(securityJobsData || []);

//       const filteredLocal = fetchLocalJobs(keyword, location, rateFilter);
//       setLocalJobs(filteredLocal);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error("Fetch failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleSearch();
//   }, []);

//   const mergedJobs = [
//     ...securityJobs.map((j) => ({ ...j, source: "security-api" })),
//     ...localJobs.map((j) => ({ ...j, source: "local" })),
//     ...adzunaJobs.map((j) => ({ ...j, source: "adzuna" })),
//     ...monsterJobs.map((j) => ({ ...j, source: "monster" })),
//   ];

//   const totalPages = Math.ceil(mergedJobs.length / pageSize);
//   const paginatedJobs = mergedJobs.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-6 md:px-32">
//       <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
//         Posted <span className="text-black">Job Ads</span>
//       </h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6">
//         <div>
//           <label className="text-sm font-semibold">Keyword</label>
//           <div className="flex items-center space-x-2">
//             <FaSearch className="text-gray-500" />
//             <input
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               placeholder="e.g. Security"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="text-sm font-semibold">Location</label>
//           <div className="flex items-center space-x-2">
//             <FaMapMarkerAlt className="text-gray-500" />
//             <input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="e.g. London"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="text-sm font-semibold">Max Pay Rate</label>
//           <div className="flex items-center space-x-2">
//             <FaMoneyBillWave className="text-gray-500" />
//             <input
//               type="number"
//               value={rateFilter ?? ""}
//               onChange={(e) =>
//                 setRateFilter(e.target.value ? parseFloat(e.target.value) : null)
//               }
//               placeholder="e.g. 30000"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div className="md:col-span-3 flex justify-end">
//           <button
//             onClick={handleSearch}
//             className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             Search Jobs
//           </button>
//         </div>
//       </div>

//       {/* Listings */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading jobs...</p>
//       ) : mergedJobs.length === 0 ? (
//         <p className="text-center text-gray-600">No jobs found for the current filters.</p>
//       ) : (
//         <>
//           {paginatedJobs.map((post, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"
//             >
//               <div className="flex justify-between items-start gap-4">
//                 <div className="flex items-start gap-4">
//                   <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
//                     <FaBriefcase className="text-white text-3xl" />
//                   </div>
//                   <div>
//   {(post.title || post.jobTitle) && (
//     <h2 className="text-2xl font-bold text-gray-900 mb-2">
//       {post.title || post.jobTitle}
//     </h2>
//   )}
//   <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
//     {(post.type || post.jobType) && (
//       <p><strong>Type:</strong> {post.type || post.jobType}</p>
//     )}
//     {(post.category || post.jobCategory) && (
//       <p><strong>Category:</strong> {post.category || post.jobCategory}</p>
//     )}
//     {(post.location || post.jobLocation) && (
//       <p><strong>Location:</strong> {post.location || post.jobLocation}</p>
//     )}
//     {(post.region || post.jobRegion) && (
//       <p><strong>Region:</strong> {post.region || post.jobRegion}</p>
//     )}
//     {(post.postcode || post.JobPostcode) && (
//       <p><strong>Postcode:</strong> {post.postcode || post.jobPostcode}</p>
//     )}
//     {(post.payRate || post.salaryRate|| post.JobSalary) && (
//       <p>
//         <strong>Pay:</strong> ${post.payRate || post.salaryRate || post.JobSalary}
//         {(post.payType || post.JobPayType) && ` (${post.payType || post.JobPayType})`}
//       </p>
//     )}
//     {(post.experience || post.requiredExperience) && (
//       <p><strong>Experience:</strong> {post.experience || post.requiredExperience}</p>
//     )}
//     {(post.shift || post.shiftAndHours) && (
//       <p><strong>Shift:</strong> {post.shift || post.shiftAndHours}</p>
//     )}
//     {(post.certifications || post.requiredLicences) && (
//       <p><strong>Certifications:</strong> {post.certifications || post.requiredLicences}</p>
//     )}
//     {(post.description || post.jobDescription) && (
//       <p className="col-span-2">
//         <strong>Description:</strong> {post.description || post.jobDescription}
//       </p>
//     )}
//     {(post.deadline || post.startDeadline) && (
//       <p className="col-span-2 flex items-center gap-2">
//         <FaCalendarAlt />
//         <span><strong>Deadline:</strong> {post.deadline || post.startDeadline}</span>
//       </p>
//     )}
//   </div>
// </div>

//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   {post.source === "local" ||post.source === "security-api" ? (
//                     <button
//                       onClick={() => applyForJob( post.id)}
//                       className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//                     >
//                       Apply
//                     </button>
//                   ) : (
//                     <a
//                       href={post.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                       Visit
//                     </a>
//                   )}
//                   <span className="flex items-center bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
//                     <FaTag className="mr-1" />
//                     {post.source === "local"
//                       ? "FindMySecurity"
//                       : post.source === "adzuna"
//                       ? "Adzuna"
//                       : post.source === "monster"
//                       ? "Monster"
//                       : "FindMySecurity"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-4 mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PostAdLister;







// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaSearch,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaTag,
// } from "react-icons/fa";

// const DEFAULT_KEYWORD = "Security Guard";
// const DEFAULT_LOCATION = "London";
// const DEFAULT_RATE = 30000;

// const PostAdLister: React.FC = () => {
//   const router = useRouter();

//   const [localJobs, setLocalJobs] = useState<any[]>([]);
//   const [adzunaJobs, setAdzunaJobs] = useState<any[]>([]);
//   const [keyword, setKeyword] = useState(DEFAULT_KEYWORD);
//   const [location, setLocation] = useState(DEFAULT_LOCATION);
//   const [rateFilter, setRateFilter] = useState<number | null>(DEFAULT_RATE);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;

//   const fetchLocalJobs = (kw: string, loc: string, rate: number | null) => {
//     const storedData = localStorage.getItem("jobs");
//     if (!storedData) return [];

//     const parsed = JSON.parse(storedData);

//     return parsed.filter((post: any) => {
//       const matchTitle = kw ? post.title?.toLowerCase().includes(kw.toLowerCase()) : true;
//       const matchLocation = loc ? post.location?.toLowerCase().includes(loc.toLowerCase()) : true;
//       const matchRate = rate !== null ? parseFloat(post.payRate) <= rate : true;
//       return matchTitle && matchLocation && matchRate;
//     });
//   };

//   const handleSearch = async () => {
//     setSearched(true);
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/reed-job?keyword=${keyword}&location=${location}&minSalary=${rateFilter}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setAdzunaJobs(data || []);
//       } else {
//         console.log("Adzuna error:", data.error);
//         setAdzunaJobs([]);
//       }

//       const filteredLocal = fetchLocalJobs(keyword, location, rateFilter);
//       console.log("Filtered local jobs:", filteredLocal);
//       setLocalJobs(filteredLocal);
//       setCurrentPage(1); // reset to page 1 on new search
//     } catch (err) {
//       console.error("Fetch failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleSearch();
//   }, []);

//   const mergedJobs = [
//     ...localJobs.map((j) => ({ ...j, source: "local" })),
//     ...adzunaJobs.map((j) => ({ ...j, source: "adzuna" })),
//   ];

//   const totalPages = Math.ceil(mergedJobs.length / pageSize);
//   const paginatedJobs = mergedJobs.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-6 md:px-32">
//       <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
//         Posted <span className="text-black">Job Ads</span>
//       </h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6">
//         <div>
//           <label className="text-sm font-semibold">Keyword</label>
//           <div className="flex items-center space-x-2">
//             <FaSearch className="text-gray-500" />
//             <input
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               placeholder="e.g. Security"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="text-sm font-semibold">Location</label>
//           <div className="flex items-center space-x-2">
//             <FaMapMarkerAlt className="text-gray-500" />
//             <input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="e.g. London"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="text-sm font-semibold">Max Pay Rate</label>
//           <div className="flex items-center space-x-2">
//             <FaMoneyBillWave className="text-gray-500" />
//             <input
//               type="number"
//               value={rateFilter ?? ""}
//               onChange={(e) =>
//                 setRateFilter(e.target.value ? parseFloat(e.target.value) : null)
//               }
//               placeholder="e.g. 30000"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         <div className="md:col-span-3 flex justify-end">
//           <button
//             onClick={handleSearch}
//             className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             Search Jobs
//           </button>
//         </div>
//       </div>

//       {/* Listings */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading jobs...</p>
//       ) : mergedJobs.length === 0 ? (
//         <p className="text-center text-gray-600">No jobs found for the current filters.</p>
//       ) : (
//         <>
//           {paginatedJobs.map((post, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"
//             >
//               <div className="flex justify-between items-start gap-4">
//                 <div className="flex items-start gap-4">
//                   <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
//                     <FaBriefcase className="text-white text-3xl" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
//                     <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
//                       <p><strong>Type:</strong> {post.type}</p>
//                       <p><strong>Category:</strong> {post.category}</p>
//                       <p><strong>Location:</strong> {post.location}</p>
//                       <p><strong>Region:</strong> {post.region}</p>
//                       <p><strong>Postcode:</strong> {post.postcode}</p>
//                       <p><strong>Pay:</strong> ${post.payRate} ({post.payType})</p>
//                       <p><strong>Experience:</strong> {post.experience}</p>
//                       <p><strong>Shift:</strong> {post.shift}</p>
//                       <p><strong>Certifications:</strong> {post.certifications}</p>
//                       <p className="col-span-2"><strong>Description:</strong> {post.description}</p>
//                       <p className="col-span-2 flex items-center gap-2">
//                         <FaCalendarAlt />
//                         <span><strong>Deadline:</strong> {post.deadline}</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   {post.source === "local" ? (
//                     <button
//                       onClick={() => router.push(`/job/${idx}`)}
//                       className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//                     >
//                       Apply
//                     </button>
//                   ) : (
//                     <a
//                       href={post.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                       Visit
//                     </a>
//                   )}
//                   <span className="flex items-center bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
//                     <FaTag className="mr-1" />
//                     {post.source === "local" ? "FindMySecurity" : "Adzuna"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center gap-4 mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PostAdLister;
