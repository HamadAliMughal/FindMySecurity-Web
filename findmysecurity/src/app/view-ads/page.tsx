"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from "react-icons/fa";

const PostAdLister: React.FC = () => {
  const router = useRouter();

  const [localJobs, setLocalJobs] = useState<any[]>([]);
  const [adzunaJobs, setAdzunaJobs] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [rateFilter, setRateFilter] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("jobs");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setLocalJobs(parsed);
    }
  }, []);

  const handleSearch = async () => {
    setSearched(true);
    try {
      const res = await fetch(`/api/reed-job?keyword=${keyword}&location=${location} &minSalary=${rateFilter}`);
      const data = await res.json();
      if (res.ok) {
        setAdzunaJobs(data || []);
      } else {
        console.error("Adzuna error:", data.error);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const filteredLocal = localJobs.filter((post) => {
    const matchTitle = keyword ? post.title?.toLowerCase().includes(keyword.toLowerCase()) : true;
    const matchLocation = location ? post.location?.toLowerCase().includes(location.toLowerCase()) : true;
    const matchRate = rateFilter !== null ? parseFloat(post.payRate) <= rateFilter : true;
    return matchTitle && matchLocation && matchRate;
  });

  return (
    <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-6 md:px-32">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Posted <span className="text-black">Job Ads</span>
      </h1>

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
              placeholder="e.g. 30"
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

      {/* Listings */}
      {[...filteredLocal.map(j => ({ ...j, source: "local" })), ...(searched ? adzunaJobs.map(j => ({ ...j, source: "adzuna" })) : [])]
        .map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaBriefcase className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
                    <p><strong>Type:</strong> {post.type}</p>
                    <p><strong>Category:</strong> {post.category}</p>
                    <p><strong>Location:</strong> {post.location}</p>
                    <p><strong>Region:</strong> {post.region}</p>
                    <p><strong>Postcode:</strong> {post.postcode}</p>
                    <p><strong>Pay:</strong> ${post.payRate} ({post.payType})</p>
                    <p><strong>Experience:</strong> {post.experience}</p>
                    <p><strong>Shift:</strong> {post.shift}</p>
                    <p><strong>Certifications:</strong> {post.certifications}</p>
                    <p className="col-span-2"><strong>Description:</strong> {post.description}</p>
                    <p className="col-span-2 flex items-center gap-2">
                      <FaCalendarAlt />
                      <span><strong>Deadline:</strong> {post.deadline}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {post.source === "local" ? (
                  <button
                    onClick={() => router.push(`/job/${idx}`)}
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
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostAdLister;
