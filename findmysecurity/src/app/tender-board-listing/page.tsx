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
        `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?q=${encodeURIComponent(query)}&page=${page}&pageSize=10`,
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
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contracts Finder</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search contracts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading results...</p>
      ) : (
        <div>
          {releases.map((release) => {
            const tender = release.tender || {};
            const award = release.awards?.[0] || {};
            const location =
              tender.items?.[0]?.deliveryAddresses?.[0]?.postalCode ||
              tender.items?.[0]?.deliveryAddresses?.[0]?.region ||
              tender.items?.[0]?.deliveryAddresses?.[0]?.countryName ||
              'N/A';

            return (
              <div key={release.ocid} className="border p-4 mb-4 rounded">
                <h2 className="text-xl font-semibold">{tender.title || 'No Title'}</h2>
                <p>{tender.description || 'No Description'}</p>
                <p><strong>Location of Work:</strong> {location}</p>
                <p><strong>Tender/Contract Type:</strong> {tender.procurementMethodDetails || 'N/A'}</p>
                <p>
                  <strong>Contract Duration:</strong>{' '}
                  {tender.contractPeriod?.startDate || 'N/A'} to{' '}
                  {tender.contractPeriod?.endDate || 'N/A'}
                </p>
                <p>
                  <strong>Estimated Budget or Value:</strong>{' '}
                  {tender.value
                    ? `${tender.value.amount} ${tender.value.currency}`
                    : 'N/A'}
                </p>
                <p>
                  <strong>Deadline for Submission:</strong>{' '}
                  {tender.tenderPeriod?.endDate || 'N/A'}
                </p>
                <p>
                  <strong>Contract Start Date:</strong>{' '}
                  {award.contractPeriod?.startDate || 'N/A'}
                </p>
                <p>
                  <strong>Submission Method:</strong> Online
                </p>
              </div>
            );
          })}

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
