import { useState } from "react";
import { ShieldCheck, User, Building, BookOpen, Briefcase, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ClientGeneralForm from "./ClientRegistrationForm";
import SecurityCompanyForm from "./SecurityCompanyRegForm";
import BusinessForm from "./CorporateForm";

const options = [
  { id: 4, title: "Looking for Security Professional", icon: ShieldCheck, description: "Find trained and verified security professionals for your needs." },
  { id: 3, title: "Security Professionals", icon: User, description: "Register yourself as a security professional and find opportunities." },
  { id: 5, title: "Security Companies", icon: Building, description: "Register your security company and connect with clients." },
  { id: 6, title: "Training Providers", icon: BookOpen, description: "Offer security training courses and certifications." },
  { id: 7, title: "Businesses", icon: Briefcase, description: "Discover top-tier security professionals, companies, and training providers tailored to your specific needs." },
];

export default function RegistrationSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Function to handle form submission and send data to API
  const handleFormSubmit = async (formData: any) => {
  

    try {
      const response = await fetch("https://findmysecurity-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      // Log response status and body
      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to register. Please try again.");
      }
      localStorage.setItem("loginData",JSON.stringify(responseData));
  
      console.log("Registration Success:", responseData);

          // Optional: Store data in localStorage
      localStorage.setItem("profileData", JSON.stringify(responseData));
    // Redirect to profile page
    router.push("/profile");
     // Redirect after success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to render the correct form based on selection
  const renderForm = () => {
    switch (selected) {
      case 4:
        return <ClientGeneralForm id={4} title="Looking for Security Professional" onSubmit={handleFormSubmit} />;
      case 3:
        return <ClientGeneralForm id={3} title="Individual Security Professional" onSubmit={handleFormSubmit} />;
      case 5:
        return <SecurityCompanyForm id={5} title="Security Companies" onSubmit={handleFormSubmit} />;
      case 6:
        return <SecurityCompanyForm id={6} title="Course Provider" onSubmit={handleFormSubmit} />;
      case 7:
        return <BusinessForm id={7} title="Corporate Clients" onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6 relative">
      {/* Back Button */}
      {step === 1 ? (
        <button className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg" onClick={() => router.push("/signin")}>
          <ArrowLeft className="w-6 h-6 mr-2" />
        </button>
      ) : (
        <button className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg" onClick={() => setStep(1)}>
          <ArrowLeft className="w-6 h-6 mr-2" /> Back
        </button>
      )}

      {/* Step 1: Selection Screen */}
      {step === 1 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Who are you?</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {options.map((option) => (
              <div
                key={option.id}
                className={`p-6 cursor-pointer transition-transform duration-200 ease-in-out rounded-2xl shadow-lg bg-gray-900 hover:scale-105 ${
                  selected === option.id ? "border-4 border-red-600" : ""
                }`}
                onClick={() => {
                  setSelected(option.id);
                  setStep(2);
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <option.icon className="w-12 h-12 text-white mb-4" />
                  <h2 className="text-xl text-white font-semibold mb-2">{option.title}</h2>
                  <p className="text-gray-400">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Step 2: Render the selected form
        renderForm()
      )}
    </div>
  );
}
