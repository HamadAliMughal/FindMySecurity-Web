// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';

// interface Release {
//   ocid: string;
//   tender?: {
//     title?: string;
//     description?: string;
//     procurementMethodDetails?: string;
//     contractPeriod?: {
//       startDate?: string;
//       endDate?: string;
//     };
//     value?: {
//       amount?: number;
//       currency?: string;
//     };
//     tenderPeriod?: {
//       endDate?: string;
//     };
//     items?: {
//       deliveryAddresses?: {
//         postalCode?: string;
//         region?: string;
//         countryName?: string;
//       }[];
//     }[];
//     url?: string;
//   };
//   awards?: {
//     contractPeriod?: {
//       startDate?: string;
//     };
//   }[];
// }

// export default function HomePage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [query, setQuery] = useState(searchParams?.get('q') || 'Security');
//   const [page, setPage] = useState(Number(searchParams?.get('page')) || 1);
//   const [releases, setReleases] = useState<Release[]>([]);
//   const [loading, setLoading] = useState(false);

// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/tender/contracts?q=${encodeURIComponent(query)}&page=${page}&pageSize=10`,
//         {
//           method: 'GET',
//          headers: {
// 					'Content-Type': 'application/x-www-form-urlencoded',
// 				},
//         }
//       );

//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await res.json();
//       setReleases(data.releases || []);
//     } catch (error) {
//       console.error('Fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, [query, page]);


//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPage(1);
//     const params = new URLSearchParams();
//     if (query) params.set('q', query);
//     params.set('page', '1');
//     router.push(`/?${params.toString()}`);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     const params = new URLSearchParams();
//     if (query) params.set('q', query);
//     params.set('page', newPage.toString());
//     router.push(`/?${params.toString()}`);
//   };

//   return (
//   <main className="px-4 mt-20 py-6 max-w-5xl mx-auto">

//   <h2 className="text-xl font-semibold mb-6 text-center text-gray-600">
//     Tender Board Listing
//   </h2>

//   <form
//     onSubmit={handleSearch}
//     className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
//   >
//     <input
//       type="text"
//       placeholder="Search contracts..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       className="w-full sm:w-auto flex-grow border p-2 rounded"
//     />
//     <button
//       type="submit"
//       className="bg-black text-white px-5 py-2 rounded hover:bg-gray-300 transition w-full sm:w-auto"
//     >
//       Search
//     </button>
//   </form>

//   {loading ? (
//     <p className="text-center text-gray-600">Loading results...</p>
//   ) : (
//     <div>
//       {releases.length === 0 ? (
//         <p className="text-center text-gray-600">No contracts found.</p>
//       ) : (
//         releases.map((release, index) => {
//           const tender = release.tender || {};
//           const award = release.awards?.[0] || {};
//           const address = tender.items?.[0]?.deliveryAddresses?.[0];

//           const location =
//             address?.postalCode ||
//             address?.region ||
//             address?.countryName ||
//             'N/A';

//           const startDate = tender.contractPeriod?.startDate || 'N/A';
//           const endDate = tender.contractPeriod?.endDate || 'N/A';
//           const value = tender.value
//             ? `${tender.value.amount} ${tender.value.currency}`
//             : 'N/A';
//           const deadline = tender.tenderPeriod?.endDate || 'N/A';
//           const contractStart = award.contractPeriod?.startDate || 'N/A';

//           return (
//             <div
//               key={`${tender.title}-${index}`}
//               className="border p-5 mb-5 rounded shadow-sm bg-white"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 {tender.title || 'No Title'}
//               </h2>
//               <p className="mb-2 text-gray-700">
//                 {tender.description || 'No Description available.'}
//               </p>

//               <div className="grid gap-2 sm:grid-cols-2 text-sm sm:text-base">
//                 <p><strong>📍 Location:</strong> {location}</p>
//                 <p><strong>📂 Type:</strong> {tender.procurementMethodDetails || 'N/A'}</p>
//                 <p><strong>📅 Duration:</strong> {startDate} – {endDate}</p>
//                 <p><strong>💰 Budget:</strong> {value}</p>
//                 <p><strong>🕓 Submission Deadline:</strong> {deadline}</p>
//                 <p><strong>🚀 Contract Start Date:</strong> {contractStart}</p>
//                 <p><strong>📤 Submission Method:</strong> Online</p>
//               </div>

//               {tender['url'] ? (
//                 <a
//                   href={tender['url']}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block mt-4 bg-black-600 text-white px-4 py-2 rounded hover:bg-black-700 transition"
//                 >
//                   View Tender
//                 </a>
//               ) : (
//                 <p className="text-gray-500 italic mt-4">No tender URL available</p>
//               )}
//             </div>
//           );
//         })
//       )}

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page <= 1}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="font-medium text-gray-700">Page {page}</span>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           className="bg-gray-300 px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )}
// </main>

//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  screenName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  roleId: number;
  validated: boolean;
}

interface Tender {
  id: number;
  title: string;
  issuingAuthority: string;
  industryType: string;
  summary: string;
  location: string;
  postCode: string;
  contractValue: string;
  procurementReference: string;
  publishedDate: string;
  contractStartDate: string;
  contractEndDate: string;
  approachToMarketDate: string;
  suitableForSMEs: boolean;
  suitableForVCSEs: boolean;
  issuerName: string;
  issuerAddress: string;
  issuerPhone: string;
  issuerEmail: string;
  issuerWebsite: string;
  howToApply: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface TenderApiResponse {
  data: Tender[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const TenderBoard: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (
    page: number,
    limit: number,
    searchTerm: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("pageSize", limit.toString());
      if (searchTerm.trim()) {
        params.append("industryType", searchTerm.trim());
      }

      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      const url = `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/tender?${params.toString()}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data: TenderApiResponse = await res.json();

      setTenders(data?.data);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page, limit, searchTerm);
  }, [page, limit, searchTerm]);

  const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({
    label,
    value,
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-1">
      <span className="text-gray-600 font-semibold w-full sm:w-48">{label}:</span>
      <span className="text-gray-800 break-words">{value || "-"}</span>
    </div>
  );

  const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({
    icon,
    title,
  }) => (
    <h3 className="flex items-center space-x-2 text-lg font-semibold text-black-700 mb-4 border-b border-black-300 pb-1">
      <span className="w-6 h-6">{icon}</span>
      <span>{title}</span>
    </h3>
  );

  return (
    <div className="p-6 max-w-5xl mt-30 mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Tender Board
      </h1>

      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Filter by industryType..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500"
        />
      </div>

      {loading && <p className="text-center text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="space-y-12">
        {tenders.map((tender) => (
          <article
            key={tender.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <header className="flex justify-between items-center flex-wrap mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex-1 min-w-0">
                {tender.title}
              </h2>
              <span className="ml-4 mt-2 sm:mt-0 bg-black text-white text-xs uppercase tracking-wide px-4 py-1 rounded whitespace-nowrap">
                FINDMYSECURITY
              </span>
            </header>

            {/* Basic Info */}
            <section className="mb-8">
              <SectionHeader
                icon={<BuildingOffice2Icon />}
                title="Basic Info"
              />
              <DetailRow label="Industry Type" value={tender.industryType} />
              <DetailRow label="Issuing Authority" value={tender.issuingAuthority} />
              <DetailRow
                label="Location"
                value={`${tender.location}, ${tender.postCode}`}
              />
              <DetailRow label="Summary" value={tender.summary} />
            </section>

            {/* Contract Details */}
            <section className="mb-8">
              <SectionHeader
                icon={<CurrencyDollarIcon />}
                title="Contract Details"
              />
              <DetailRow label="Contract Value" value={tender.contractValue} />
              <DetailRow label="Procurement Ref" value={tender.procurementReference} />
              <DetailRow label="Published Date" value={tender.publishedDate} />
              <DetailRow label="Contract Start" value={tender.contractStartDate} />
              <DetailRow label="Contract End" value={tender.contractEndDate} />
              <DetailRow
                label="Approach To Market Date"
                value={tender.approachToMarketDate}
              />
            </section>

            {/* Suitability */}
            <section className="mb-8">
              <SectionHeader
                icon={<UserGroupIcon />}
                title="Suitability"
              />
              <DetailRow
                label="Suitable for SMEs"
                value={tender.suitableForSMEs ? "Yes" : "No"}
              />
              <DetailRow
                label="Suitable for VCSEs"
                value={tender.suitableForVCSEs ? "Yes" : "No"}
              />
            </section>

            {/* Issuer Contact */}
            <section className="mb-8">
              <SectionHeader
                icon={<PhoneIcon />}
                title="Issuer Contact"
              />
              <DetailRow label="Issuer Name" value={tender.issuerName} />
              <DetailRow label="Issuer Address" value={tender.issuerAddress} />
              <DetailRow label="Phone" value={tender.issuerPhone} />
              <DetailRow label="Email" value={tender.issuerEmail} />
              <div className="flex items-center space-x-2 mt-2">
                <LinkIcon className="w-5 h-5 text-black-600" />
                <a
                  href={tender.issuerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-600 underline hover:text-black-800 break-words"
                >
                  Go to Application Link
                </a>
              </div>
            </section>

            {/* Application Info */}
            <section>
              <SectionHeader
                icon={<DocumentTextIcon />}
                title="How to Apply"
              />
              <p className="text-gray-800 whitespace-pre-wrap">{tender.howToApply || "N/A"}</p>
            </section>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-12 space-x-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Prev
        </button>
        <span className="font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TenderBoard;


