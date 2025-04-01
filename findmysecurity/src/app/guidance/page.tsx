"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft,AlertTriangle,Shield,BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Guidance: React.FC = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  useEffect(()=>{
    const storedData =
    localStorage.getItem("profileData") || localStorage.getItem("loginData");
  if (storedData) {
    setProfileData(JSON.parse(storedData));
  } else {
    router.push("/"); // Redirect if no profile data is found
  }
  },[router])
  if (!profileData) return null;

  const qualifications = [
    {
      category: 'Physical Security & Manned Guarding',
      roles: [
        { name: 'Security Officer', requirements: 'Must obtain a Security Industry Authority (SIA) licence by completing an approved training course and passing background checks.' },
        { name: 'Retail Security Officer', requirements: 'Requires an SIA licence, similar to general security officers, with additional training focused on retail environments.' },
        { name: 'Corporate Security Officer', requirements: 'An SIA licence is mandatory, often accompanied by training specific to corporate settings.' },
        { name: 'Door Supervisor', requirements: 'Must hold an SIA Door Superior licence, which includes specialized training for managing licensed premises.' },
        { name: 'Event Security Officer', requirements: 'Requires an SIA licence, with training tailored to crowd management and event-specific security protocols.' },
        { name: 'Mobile Patrol Officer', requirements: 'An SIA licence is necessary, and a valid driving licence is typically required for patrolling duties.' },
        { name: 'Loss Prevention Officer', requirements: 'Must possess an SIA licence, with additional training in theft prevention and asset protection strategies.' },
        { name: 'Access Control Officer', requirements: 'An SIA licence is required, focusing on managing and monitoring entry to secure premises.' },
      ]
    },
    {
      category: 'Specialist Security & Protection',
      roles: [
        { name: 'Close Protection Officer (CPO)', requirements: 'Requires an SIA Close Protection licence, which involves advanced training in personal protection, risk assessment, and first aid certificate.' },
        { name: 'Maritime Security Officer', requirements: 'Must obtain an SIA licence and may need additional maritime-specific security training, including certifications like the Proficiency in Desktop or Airways.' },
        { name: 'Aviation Security Officer', requirements: 'Requires an SIA licence and must complete Department for Transport (DIT) approval aviation security training.' },
        { name: 'High-Value Goods Escort Officer', requirements: 'An SIA licence is mandatory, with specialized training in secure transportation and handling of valuable assets.' },
        { name: 'Residential Security Team (RST) Member', requirements: 'Must hold an SIA licence, often with additional training in residential security protocols and emergency response.' },
        { name: 'RQ Security Handler', requirements: 'Requires an SIA licence not certification to enable handling from recognized institutions.' },
        { name: 'Armed Security Professional', requirements: 'While the UK has stringent regulations on armed security, certain roles may require specific firearms training and certification, subject to limitations.' },
        { name: 'VIP Chauffeur & Security Driver', requirements: 'An SIA licence is necessary, along with advanced driving qualifications and training in protective driving techniques.' },
      ]
    },
    {
      category: 'Surveillance & Intelligence',
      roles: [
        { name: 'CCTV Operator', requirements: 'Must obtain an SIA Public Space Surveillance (CCTV) licence, which includes training in surveillance techniques and data protection laws.' },
        { name: 'Security Control Room Operator', requirements: 'An SIA licence is required, focusing on managing security systems and emergency response coordination.' },
        { name: 'Covert Surveillance Specialist', requirements: 'May require an SIA licence, with advanced training in covert operations and legal compliance.' },
        { name: 'Counter-Surveillance Expert', requirements: 'An SIA licence is normally necessary, along with specialized training in detecting and mitigating surveillance threats.' },
        { name: 'Threat Intelligence Analyst', requirements: 'With an SIA licence may not be mandatory, relevant qualifications in intelligence analysis and cybersecurity are often required.' },
        { name: 'Technical Surveillance Countermeasures (TSCM) Specialist', requirements: 'Requires specialized training in detecting and neutralizing electronic surveillance devices.' },
        { name: 'Forensic Security Investigator', requirements: 'Qualifications in forensic science and investigative procedures are essential, with certifications from recognized bodies.' },
      ]
    },
    {
      category: 'Cybersecurity & Information Security',
      roles: [
        { name: 'Cybersecurity Analyst', requirements: 'Relevant qualifications such as Certified Information Systems Security Professional (CISSP) or Certified Information Security Manager (CISM).' },
        { name: 'Ethical Hacker / Penetration Tester', requirements: 'Certifications like Certified Ethical Hacker (CEH) or Offensive Security Certified Professional (OSCP) are essential.' },
        { name: 'Incident Response Specialist', requirements: 'Qualifications in cybersecurity and Incident management, such as GIAC Certified Incident Handler (GCHI), are beneficial.' },
        { name: 'Digital Forensics Investigator', requirements: 'Certifications like Certified Computer Forensics Examiner (CCFE) or Certified Forensic Computer Examiner (CFCE) are often required.' },
        { name: 'IT Security Auditor', requirements: 'Qualifications such as Certified Information Systems Auditor (CISA) are essential for auditing roles.' },
        { name: 'Identity & Access Management (IAM) Specialist', requirements: 'Relevant certifications in identity management and cybersecurity are beneficial.' },
      ]
    },
    {
      category: 'Risk Management & Consultancy',
      roles: [
        { name: 'Security Risk Consultant', requirements: 'Professional certifications like Certified Protection Professional (CPP) are advantageous.' },
        { name: 'Physical Security Consultant', requirements: 'An SIA licence may be required, along with experience in physical security assessments.' },
        { name: 'Counter-Terrorism Advisor', requirements: 'Specialized training in counter-terrorism strategies and threat assessment is essential.' },
        { name: 'Crisis Management Specialist', requirements: 'Qualifications in crisis management and emergency planning are beneficial.' },
        { name: 'Business Continuity & Resilience Expert', requirements: 'Certifications like Certified Business Continuity Professional (CRCP) are often required.' },
        { name: 'Fraud Prevention Investigator', requirements: 'Qualifications in fraud examination, such as Certified Fraud Examiner (CFE), are essential.' },
      ]
    },
    {
      category: 'Transport & Logistics Security',
      roles: [
        { name: 'Secure Cash Transit Officer', requirements: 'An SIA licence is mandatory, with additional training in secure transportation protocols.' },
        { name: 'Fleet Security Manager', requirements: 'Relevant qualifications in logistics and security management are beneficial.' },
        { name: 'Cargo & Supply Chain Security', requirements: 'Certifications in supply chain security and management.' },
      ]
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <div className="absolute top-4 left-4 mt-20 flex items-center text-gray-600 hover:text-black">
        <button
          className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
        </button>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-400 p-6 rounded-lg shadow-lg my-20 md:my-12 animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-amber-800 text-lg mb-2">Important Notice!</p>
            <p className="text-gray-700 text-sm leading-relaxed">
            These qualifications are for general guidance, you must check with UK official websites for specific roles
            to stay up to date , before taking role in specific field of security.
            </p>
          </div>
        </div>
      </div>

      {/* Qualifications Sections */}
      {qualifications.map((section, index) => (
        <div key={index} className="mb-14">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-6 group">
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors duration-300">
              <Shield className="w-6 h-6 text-gray-800" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              {section.category}
            </h2>
          </div>

          {/* Role List */}
          <div className="grid gap-4 md:grid-cols-2">
            {section.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                className="flex items-start bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gray-100 p-2 rounded-full mr-4">
                  <BadgeCheck className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base mb-1.5 flex items-center gap-2">
                    {role.name}
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      SIA Licensed
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.requirements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Guidance;








// "use client"

// import React from 'react';
// import { ArrowLeft } from "lucide-react";
// import { useRouter} from "next/navigation";

// const Guidance: React.FC = () => {
//     const router = useRouter();
    
  // const qualifications = [
  //   {
  //     category: 'Physical Security & Manned Guarding',
  //     roles: [
  //       { name: 'Security Officer', requirements: 'Must obtain a Security Industry Authority (SIA) licence by completing an approved training course and passing background checks.' },
  //       { name: 'Retail Security Officer', requirements: 'Requires an SIA licence, similar to general security officers, with additional training focused on retail environments.' },
  //       { name: 'Corporate Security Officer', requirements: 'An SIA licence is mandatory, often accompanied by training specific to corporate settings.' },
  //       { name: 'Door Supervisor', requirements: 'Must hold an SIA Door Superior licence, which includes specialized training for managing licensed premises.' },
  //       { name: 'Event Security Officer', requirements: 'Requires an SIA licence, with training tailored to crowd management and event-specific security protocols.' },
  //       { name: 'Mobile Patrol Officer', requirements: 'An SIA licence is necessary, and a valid driving licence is typically required for patrolling duties.' },
  //       { name: 'Loss Prevention Officer', requirements: 'Must possess an SIA licence, with additional training in theft prevention and asset protection strategies.' },
  //       { name: 'Access Control Officer', requirements: 'An SIA licence is required, focusing on managing and monitoring entry to secure premises.' },
  //     ]
  //   },
  //   {
  //     category: 'Specialist Security & Protection',
  //     roles: [
  //       { name: 'Close Protection Officer (CPO)', requirements: 'Requires an SIA Close Protection licence, which involves advanced training in personal protection, risk assessment, and first aid certificate.' },
  //       { name: 'Maritime Security Officer', requirements: 'Must obtain an SIA licence and may need additional maritime-specific security training, including certifications like the Proficiency in Desktop or Airways.' },
  //       { name: 'Aviation Security Officer', requirements: 'Requires an SIA licence and must complete Department for Transport (DIT) approval aviation security training.' },
  //       { name: 'High-Value Goods Escort Officer', requirements: 'An SIA licence is mandatory, with specialized training in secure transportation and handling of valuable assets.' },
  //       { name: 'Residential Security Team (RST) Member', requirements: 'Must hold an SIA licence, often with additional training in residential security protocols and emergency response.' },
  //       { name: 'RQ Security Handler', requirements: 'Requires an SIA licence not certification to enable handling from recognized institutions.' },
  //       { name: 'Armed Security Professional', requirements: 'While the UK has stringent regulations on armed security, certain roles may require specific firearms training and certification, subject to limitations.' },
  //       { name: 'VIP Chauffeur & Security Driver', requirements: 'An SIA licence is necessary, along with advanced driving qualifications and training in protective driving techniques.' },
  //     ]
  //   },
  //   {
  //     category: 'Surveillance & Intelligence',
  //     roles: [
  //       { name: 'CCTV Operator', requirements: 'Must obtain an SIA Public Space Surveillance (CCTV) licence, which includes training in surveillance techniques and data protection laws.' },
  //       { name: 'Security Control Room Operator', requirements: 'An SIA licence is required, focusing on managing security systems and emergency response coordination.' },
  //       { name: 'Covert Surveillance Specialist', requirements: 'May require an SIA licence, with advanced training in covert operations and legal compliance.' },
  //       { name: 'Counter-Surveillance Expert', requirements: 'An SIA licence is normally necessary, along with specialized training in detecting and mitigating surveillance threats.' },
  //       { name: 'Threat Intelligence Analyst', requirements: 'With an SIA licence may not be mandatory, relevant qualifications in intelligence analysis and cybersecurity are often required.' },
  //       { name: 'Technical Surveillance Countermeasures (TSCM) Specialist', requirements: 'Requires specialized training in detecting and neutralizing electronic surveillance devices.' },
  //       { name: 'Forensic Security Investigator', requirements: 'Qualifications in forensic science and investigative procedures are essential, with certifications from recognized bodies.' },
  //     ]
  //   },
  //   {
  //     category: 'Cybersecurity & Information Security',
  //     roles: [
  //       { name: 'Cybersecurity Analyst', requirements: 'Relevant qualifications such as Certified Information Systems Security Professional (CISSP) or Certified Information Security Manager (CISM).' },
  //       { name: 'Ethical Hacker / Penetration Tester', requirements: 'Certifications like Certified Ethical Hacker (CEH) or Offensive Security Certified Professional (OSCP) are essential.' },
  //       { name: 'Incident Response Specialist', requirements: 'Qualifications in cybersecurity and Incident management, such as GIAC Certified Incident Handler (GCHI), are beneficial.' },
  //       { name: 'Digital Forensics Investigator', requirements: 'Certifications like Certified Computer Forensics Examiner (CCFE) or Certified Forensic Computer Examiner (CFCE) are often required.' },
  //       { name: 'IT Security Auditor', requirements: 'Qualifications such as Certified Information Systems Auditor (CISA) are essential for auditing roles.' },
  //       { name: 'Identity & Access Management (IAM) Specialist', requirements: 'Relevant certifications in identity management and cybersecurity are beneficial.' },
  //     ]
  //   },
  //   {
  //     category: 'Risk Management & Consultancy',
  //     roles: [
  //       { name: 'Security Risk Consultant', requirements: 'Professional certifications like Certified Protection Professional (CPP) are advantageous.' },
  //       { name: 'Physical Security Consultant', requirements: 'An SIA licence may be required, along with experience in physical security assessments.' },
  //       { name: 'Counter-Terrorism Advisor', requirements: 'Specialized training in counter-terrorism strategies and threat assessment is essential.' },
  //       { name: 'Crisis Management Specialist', requirements: 'Qualifications in crisis management and emergency planning are beneficial.' },
  //       { name: 'Business Continuity & Resilience Expert', requirements: 'Certifications like Certified Business Continuity Professional (CRCP) are often required.' },
  //       { name: 'Fraud Prevention Investigator', requirements: 'Qualifications in fraud examination, such as Certified Fraud Examiner (CFE), are essential.' },
  //     ]
  //   },
  //   {
  //     category: 'Transport & Logistics Security',
  //     roles: [
  //       { name: 'Secure Cash Transit Officer', requirements: 'An SIA licence is mandatory, with additional training in secure transportation protocols.' },
  //       { name: 'Fleet Security Manager', requirements: 'Relevant qualifications in logistics and security management are beneficial.' },
  //     ]
  //   }
  // ];

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//          {/* Back Button */}
//         <button
//           className="absolute top-4 left-4 mt-20 flex items-center text-gray-600 hover:text-black"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" /> Back
//         </button>
//       {/* Disclaimer Section */}
//       <div className="bg-yellow-50 border-l-4 mt-20 border-yellow-400 p-4 mb-8">
//         <p className="font-bold text-yellow-800">Please Note!</p>
//         <p className="text-gray-700">
//         These qualifications are for general guidance, you must check with UK official websites for specific roles
//         to stay up to date , before taking role in specific field of security
//         </p>
//       </div>

//       {/* Qualifications Sections */}
//       {qualifications.map((section, index) => (
//         <div key={index} className="mb-10">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
//             {section.category}
//           </h2>
//           <ul className="space-y-4">
//             {section.roles.map((role, roleIndex) => (
//               <li key={roleIndex} className="flex">
//                 <span className="text-blue-500 mr-2">•</span>
//                 <div>
//                   <span className="font-medium text-gray-900">{role.name}:</span>{' '}
//                   <span className="text-gray-700">{role.requirements}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Guidance;