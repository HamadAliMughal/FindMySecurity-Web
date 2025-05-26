'use client';

import React, { useEffect, useState } from 'react';

export default function TenderBoardListing() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('Security');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/tenderboard?q=${encodeURIComponent(query)}&page=${page}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from API route');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contracts Finder</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tenders"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {data?.releases?.length === 0 && <p>No results found.</p>}

      {data?.releases?.map((release: any) => (
        <div key={release.ocid} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-semibold">
            Tender/Contract Title: {release.tender?.title || 'N/A'}
          </h2>
          <p>Tender/Contract Description: {release.tender?.description || 'N/A'}</p>
          <p>Location of Work: {release.planning?.locations?.map((loc: any) => loc.description).join(', ') || 'N/A'}</p>
          <p>Tender/Contract Type: {release.tender?.mainProcurementCategory || 'N/A'}</p>
          <p>Contract Duration: {release.tender?.contractPeriod?.durationInDays || 'N/A'} days</p>
          <p>Estimated Budget or Value: {release.tender?.value?.amount || 'N/A'}</p>
          <p>Deadline for Submission: {release.tender?.submissionDeadline || 'N/A'}</p>
          <p>Contract Start Date: {release.tender?.contractPeriod?.startDate || 'N/A'}</p>
          <p>Submission Method: {release.tender?.submissionMethod || 'N/A'}</p>
        </div>
      ))}

      {/* Simple Pagination */}
      <div className="flex space-x-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
}
