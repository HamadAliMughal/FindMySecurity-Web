import { useState } from "react";
import { ShieldCheck, User, Building, BookOpen, Briefcase, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ClientGeneralForm from "./ClientRegistrationForm";
import SecurityCompanyForm from "./SecurityCompanyRegForm";
import BusinessForm from './CorporateForm'

const options = [
  { id: 1, title: "Looking for Security Professional", icon: ShieldCheck, description: "Find trained and verified security professionals for your needs." },
  { id: 2, title: "Individual Security Professional", icon: User, description: "Register yourself as a security professional and find opportunities." },
  { id: 3, title: "Security Companies", icon: Building, description: "Register your security company and connect with clients." },
  { id: 4, title: "Course Provider", icon: BookOpen, description: "Offer security training courses and certifications." },
  { id: 5, title: "Corporate Clients", icon: Briefcase, description: "Find top security professionals and companies for your business." },
];

export default function RegistrationSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();
  // Function to render the correct form based on the selection
  const renderForm = () => {
    switch (selected) {
      case 1: return <ClientGeneralForm id={1} title={'Looking for Security Professional'} />;
      case 2: return <ClientGeneralForm id={2} title={'Individual Security Professional'} />;
      case 3: return <SecurityCompanyForm id={3} title={'Security Companies'} />;
      case 4: return  <SecurityCompanyForm id={4} title={'Course Provider'} />;
      case 5: return  <BusinessForm id={5} title={'Corporate Clients'} />;
      // case 5: return <Form5 onNext={() => setStep(2)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6 relative">
      {/* Back Button */}
      {step === 1 ? (
        <button className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg"
        onClick={() => router.push("/signin")}>
          <ArrowLeft className="w-6 h-6 mr-2" />
        </button>
      ) : (
        <button className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg"
          onClick={() => setStep(1)}>
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
                className={`p-6 cursor-pointer transition-transform duration-200 ease-in-out rounded-2xl shadow-lg bg-gray-900 hover:scale-105 ${selected === option.id ? "border-4 border-red-600" : ""}`}
                onClick={() => { setSelected(option.id); setStep(2); }}
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
