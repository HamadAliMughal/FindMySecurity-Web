'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "@/utils/path";

interface Job {
  id: number;
  jobTitle: string;
  jobType: string;
  industryCategory: string;
  region: string;
  postcode: string;
  salaryRate: number;
  salaryType: string;
  jobDescription: string;
  requiredExperience: string;
  requiredLicences: string;
  shiftAndHours: string;
  startDate: string;
  deadline: string;
}

const USER_ID = 5;
const BASE_URL = `${API_URL}/security-jobs`;

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
    const storedData = localStorage.getItem("loginData") || localStorage.getItem("profileData");
    const data = storedData ? JSON.parse(storedData) : null;

    const currentRoleId = data?.id || data?.UserId;

    try {
      const response = await axios.get(`${BASE_URL}/jobs/${currentRoleId}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, meta } = response.data;
      setJobs(data);
      setFilteredJobs(data);
      setLastPage(meta.lastPage);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const deleteJob = async (id: number) => {
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');

    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = jobs.filter((job) => job.id !== id);
      setJobs(updated);
      setFilteredJobs(updated);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 mt-20">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-black">My Ads Listings</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-black bg-white text-black placeholder-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {loading ? (
        <p className="text-gray-700">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <div className="space-y-6">
  {filteredJobs.map((job) => (
    <div
      key={job.id}
      className="bg-white border border-black rounded-xl shadow hover:shadow-lg transition duration-300 p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">{job.jobTitle}</h2>
          <p className="text-sm text-gray-600 italic">{job.jobType} • {job.industryCategory}</p>
        </div>
        <button
          onClick={() => deleteJob(job.id)}
          className="text-sm px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition"
        >
          Delete
        </button>
      </div>

      <hr className="my-4 border-black" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
        <div>
          <p><span className="font-semibold">Location:</span> {job.region}, {job.postcode}</p>
          <p><span className="font-semibold">Shift:</span> {job.shiftAndHours}</p>
          <p><span className="font-semibold">Start:</span> {job.startDate}</p>
          <p><span className="font-semibold">Deadline:</span> {job.deadline}</p>
        </div>
        <div>
          <p><span className="font-semibold">Salary:</span> {job.salaryRate} ({job.salaryType})</p>
          <p><span className="font-semibold">Experience:</span> {job.requiredExperience}</p>
          <p><span className="font-semibold">Licences:</span> {job.requiredLicences}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-black mb-1">Job Description</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {job.jobDescription}
        </p>
      </div>
    </div>
  ))}
</div>

      )}

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium border border-black rounded bg-white hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={page === lastPage}
          className="px-4 py-2 text-sm font-medium border border-black rounded bg-white hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsPage;
