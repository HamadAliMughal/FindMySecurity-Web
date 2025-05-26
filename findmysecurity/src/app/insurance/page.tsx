"use client";

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insurance Cover
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Protecting security professionals and businesses with comprehensive coverage solutions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 50C117.2 50 50 117.2 50 200C50 282.8 117.2 350 200 350C282.8 350 350 282.8 350 200C350 117.2 282.8 50 200 50ZM200 320C133.8 320 80 266.2 80 200C80 133.8 133.8 80 200 80C266.2 80 320 133.8 320 200C320 266.2 266.2 320 200 320Z" fill="#E5E7EB"/>
                <path d="M200 100C145.2 100 100 145.2 100 200C100 254.8 145.2 300 200 300C254.8 300 300 254.8 300 200C300 145.2 254.8 100 200 100ZM200 270C161.4 270 130 238.6 130 200C130 161.4 161.4 130 200 130C238.6 130 270 161.4 270 200C270 238.6 238.6 270 200 270Z" fill="#9CA3AF"/>
                <circle cx="200" cy="200" r="50" fill="#4B5563"/>
              </svg>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Insurance Partnerships in Development
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're currently in discussions with leading insurance providers to bring you specialized coverage options designed for the security industry.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <p className="text-base md:text-lg text-gray-600">
                  For immediate insurance inquiries or to discuss potential partnerships, please reach out to our dedicated team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}