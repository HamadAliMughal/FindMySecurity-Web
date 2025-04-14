"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

const PostAdLister: React.FC = () => {
  const router = useRouter();

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [postcodeFilter, setPostcodeFilter] = useState("");
  const [rateFilter, setRateFilter] = useState<number | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("allJobPostings");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAllPosts(parsed);
      setFilteredPosts(parsed);
    }
  }, []);

  useEffect(() => {
    let updated = [...allPosts];

    if (filterText) {
      updated = updated.filter((post) =>
        post.title?.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (postcodeFilter) {
      updated = updated.filter((post) =>
        post.postcode?.toLowerCase().includes(postcodeFilter.toLowerCase())
      );
    }

    if (rateFilter !== null) {
      updated = updated.filter(
        (post) => parseFloat(post.payRate) <= rateFilter
      );
    }

    setFilteredPosts(updated);
  }, [filterText, postcodeFilter, rateFilter, allPosts]);

  return (
    <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-6 md:px-32">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Posted <span className="text-black">Job Ads</span>
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <div>
          <label className="text-sm font-semibold">Search by Title</label>
          <div className="flex items-center space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="E.g. Black Habibi"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Filter by Postcode</label>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              value={postcodeFilter}
              onChange={(e) => setPostcodeFilter(e.target.value)}
              placeholder="E.g. 12344"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Max Hourly Rate</label>
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave className="text-gray-500" />
            <input
              type="number"
              value={rateFilter ?? ""}
              onChange={(e) => setRateFilter(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="E.g. 237"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, idx) => (
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
                    <p><strong>Experience:</strong> {post.experience} yrs</p>
                    <p><strong>Shift:</strong> {post.shift}</p>
                    <p><strong>Certifications:</strong> {post.certifications}</p>
                    <p className="col-span-2">
                      <strong>Description:</strong> {post.description}
                    </p>
                    <p className="col-span-2 flex items-center gap-2">
                      <FaCalendarAlt />
                      <span><strong>Deadline:</strong> {post.deadline}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => router.push(`/job/${idx}`)}
                  className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts found with current filters.</p>
      )}
    </div>
  );
};

export default PostAdLister;
