'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Release {
  ocid: string;
  tender?: {
    title?: string;
    description?: string;
    procurementMethodDetails?: string;
    contractPeriod?: {
      startDate?: string;
      endDate?: string;
    };
    value?: {
      amount?: number;
      currency?: string;
    };
    tenderPeriod?: {
      endDate?: string;
    };
    items?: {
      deliveryAddresses?: {
        postalCode?: string;
        region?: string;
        countryName?: string;
      }[];
    }[];
    url?: string;
  };
  awards?: {
    contractPeriod?: {
      startDate?: string;
    };
  }[];
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams?.get('q') || 'Security');
  const [page, setPage] = useState(Number(searchParams?.get('page')) || 1);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/tender/contracts?q=${encodeURIComponent(query)}&page=${page}&pageSize=10`,
        {
          method: 'GET',
         headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
        }
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setReleases(data.releases || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [query, page]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
  <main className="px-4 mt-20 py-6 max-w-5xl mx-auto">

  <h2 className="text-xl font-semibold mb-6 text-center text-gray-600">
    Tender Board Listing
  </h2>

  <form
    onSubmit={handleSearch}
    className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
  >
    <input
      type="text"
      placeholder="Search contracts..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full sm:w-auto flex-grow border p-2 rounded"
    />
    <button
      type="submit"
      className="bg-black text-white px-5 py-2 rounded hover:bg-gray-300 transition w-full sm:w-auto"
    >
      Search
    </button>
  </form>

  {loading ? (
    <p className="text-center text-gray-600">Loading results...</p>
  ) : (
    <div>
      {releases.length === 0 ? (
        <p className="text-center text-gray-600">No contracts found.</p>
      ) : (
        releases.map((release, index) => {
          const tender = release.tender || {};
          const award = release.awards?.[0] || {};
          const address = tender.items?.[0]?.deliveryAddresses?.[0];

          const location =
            address?.postalCode ||
            address?.region ||
            address?.countryName ||
            'N/A';

          const startDate = tender.contractPeriod?.startDate || 'N/A';
          const endDate = tender.contractPeriod?.endDate || 'N/A';
          const value = tender.value
            ? `${tender.value.amount} ${tender.value.currency}`
            : 'N/A';
          const deadline = tender.tenderPeriod?.endDate || 'N/A';
          const contractStart = award.contractPeriod?.startDate || 'N/A';

          return (
            <div
              key={`${tender.title}-${index}`}
              className="border p-5 mb-5 rounded shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">
                {tender.title || 'No Title'}
              </h2>
              <p className="mb-2 text-gray-700">
                {tender.description || 'No Description available.'}
              </p>

              <div className="grid gap-2 sm:grid-cols-2 text-sm sm:text-base">
                <p><strong>📍 Location:</strong> {location}</p>
                <p><strong>📂 Type:</strong> {tender.procurementMethodDetails || 'N/A'}</p>
                <p><strong>📅 Duration:</strong> {startDate} – {endDate}</p>
                <p><strong>💰 Budget:</strong> {value}</p>
                <p><strong>🕓 Submission Deadline:</strong> {deadline}</p>
                <p><strong>🚀 Contract Start Date:</strong> {contractStart}</p>
                <p><strong>📤 Submission Method:</strong> Online</p>
              </div>

              {tender['url'] ? (
                <a
                  href={tender['url']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Tender
                </a>
              ) : (
                <p className="text-gray-500 italic mt-4">No tender URL available</p>
              )}
            </div>
          );
        })
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium text-gray-700">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )}
</main>

  );
}
