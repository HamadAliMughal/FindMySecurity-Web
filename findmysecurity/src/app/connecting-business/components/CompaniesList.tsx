import { useState } from "react";
import { CompaniesApiResponse, Company } from "../types";
import GenericModal from "@/sections/components/modal/GenericModal";
import { useRouter } from "next/navigation";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

// ✅ Updated Props Interface to accept null as well
interface CompaniesListProps {
    apiData: CompaniesApiResponse | null;  // Allowing null value
    loading: boolean;
    error: string | null;
}

export default function CompaniesList({ apiData, loading, error }: CompaniesListProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Available Companies {apiData && `(${apiData.totalCount} found)`}
        </h2>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {!loading && apiData && (
        <>
          {apiData.companies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {apiData.companies.map((company: Company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
              No companies found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
}

const CompanyCard = ({ company }: { company: Company }) => {
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken")?.replace(/^"|"$/g, "") : null;
    const router = useRouter();
  
    const handleViewProfile = () => {
      if (!token) {
        setShowLoginPrompt(true);
      } else {
        router.push(`/company-profile/${company.id}`);
      }
    };
  
    const handleCloseLoginPrompt = () => {
      setShowLoginPrompt(false);
      router.push("/signin");
    };
  
    return (
      <AnimateOnScrollProvider>
        <div
          className="relative rounded-2xl p-6 bg-white hover:shadow-xl transition-all border border-gray-100 hover:border-transparent hover:ring-2 hover:ring-indigo-400"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
            {/* Logo Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                N/A
              </div>
            </div>
  
            {/* Company Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className={`text-xl font-semibold text-gray-900 ${token ? "" : "blur-sm"}`}>
                  {company.companyName}
                </h3>
                {company.contactPerson && (
                  <p className={`text-gray-500 mt-1 text-sm ${token ? "" : "blur-sm"}`}>
                    Contact: {company.contactPerson}
                  </p>
                )}
              </div>
  
              {/* Services Requirements */}
              <div className={`mt-3 flex flex-wrap gap-2 ${token ? "" : "blur-sm"}`}>
                {company.servicesRequirements.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full border border-indigo-200"
                  >
                    {service}
                  </span>
                ))}
                {company.servicesRequirements.length > 3 && (
                  <span className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full border border-indigo-200">
                    +{company.servicesRequirements.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
  
          {/* Address and Action */}
          <div className="grid md:grid-cols-[1fr_auto] gap-4 mt-6 items-start">
            <div className="flex flex-col gap-2">
              {company.address && (
                <p className={`text-sm text-gray-400 flex items-center gap-1 ${token ? "" : "blur-sm"}`}>
                  <LocationIcon />
                  {company.address}
                </p>
              )}
            </div>
  
            <button
              onClick={handleViewProfile}
              className={`w-fit self-start px-5 py-2 rounded-lg text-sm font-medium transition-all shadow ${
                token
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              title={!token ? "Please login to view the profile" : ""}
            >
              View Profile
            </button>
          </div>
        </div>
  
        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <GenericModal
            show={showLoginPrompt}
            onClose={handleCloseLoginPrompt}
            icon={
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            }
            title="Please Login First"
            message="You need to be logged in to view company profiles."
            buttonText="Got it!"
          />
        )}
      </AnimateOnScrollProvider>
    );
  };
  

// LocationIcon SVG component
const LocationIcon = () => (
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
