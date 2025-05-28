import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Shield, Users, Camera, Truck, Lock, ChartBar, Search, Key, Laptop } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';

interface Category {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  roles: {
    title: string;
    description: string;
  }[];
}

const categories: Category[] = [
  {
    id: 'physical-security',
    title: 'Physical Security & Manned Guarding',
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    description: 'Front-line security professionals responsible for protecting people, property, and assets through physical presence and surveillance.',
    roles: [
      { title: 'Security Officer', description: 'Maintains security by patrolling and monitoring premises and personnel.' },
      { title: 'Retail Security Officer', description: 'Specializes in retail environment security and loss prevention.' },
      { title: 'Corporate Security Officer', description: 'Provides security services in corporate settings.' },
      { title: 'Door Supervisor', description: 'Controls entry to venues and maintains order within establishments.' },
      { title: 'Dog Handler', description: 'Works with trained security dogs for enhanced protection.' },
      { title: 'Dog Handler Services', description: 'Provides comprehensive security services with trained canine units.' },
      { title: 'Event Security Officer', description: 'Manages security at events and large gatherings.' },
      { title: 'Mobile Patrol Officer', description: 'Conducts mobile security patrols across multiple locations.' },
      { title: 'Loss Prevention Officer', description: 'Prevents theft and reduces inventory shrinkage in retail environments.' },
      { title: 'Access Control Officer', description: 'Manages and controls access to secure facilities.' },
      { title: 'Estate Security Officer', description: 'Provides security for residential estates and communities.' },
      { title: 'University Campus Security Officer', description: 'Ensures safety and security in educational institutions.' },
      { title: 'Hospital Security Officer', description: 'Maintains security in healthcare facilities.' },
      { title: 'Museum & Art Gallery Security Officer', description: 'Protects valuable artifacts and artwork.' },
      { title: 'Construction Site Security Officer', description: 'Secures construction sites and equipment.' },
      { title: 'Concierge Security Officer', description: 'Combines security with customer service in luxury properties.' },
      { title: 'Hotel Security Officer', description: 'Ensures safety in hospitality environments.' },
      { title: 'Bank & Financial Institution Security Officer', description: 'Provides security for financial institutions.' }
    ]
  },
  {
    id: 'specialist-security',
    title: 'Specialist Security Roles',
    icon: <Users className="w-6 h-6 text-green-500" />,
    description: 'Specialized security professionals providing advanced protection services for specific clients and situations.',
    roles: [
      { title: 'Close Protection Officer (CPO)', description: 'Provides personal security for high-profile individuals.' },
      { title: 'Armed Security Officer', description: 'Licensed to carry firearms for high-risk security operations.' },
      { title: 'High-Net-Worth Individual (HNWI) Protection', description: 'Specialized protection for wealthy individuals and families.' },
      { title: 'Residential Security Team (RST) Member', description: 'Provides comprehensive security for residential properties.' },
      { title: 'VIP Chauffeur & Security Driver', description: 'Combines driving and security skills for VIP transportation.' },
      { title: 'Counter-Kidnap & Hostage Negotiator', description: 'Specializes in high-risk situation management.' },
      { title: 'Religious Institution Security Officer', description: 'Provides security for places of worship.' }
    ]
  },
  {
    id: 'surveillance-monitoring',
    title: 'Surveillance & Monitoring',
    icon: <Camera className="w-6 h-6 text-purple-500" />,
    description: 'Professionals specializing in electronic and physical surveillance operations.',
    roles: [
      { title: 'CCTV Operator', description: 'Monitors security cameras and responds to incidents.' },
      { title: 'Security Control Room Operator', description: 'Manages security operations from a central control room.' },
      { title: 'Covert Surveillance Operative', description: 'Conducts discreet observation and intelligence gathering.' },
      { title: 'Counter-Surveillance Specialist', description: 'Detects and prevents unauthorized surveillance activities.' }
    ]
  },
  {
    id: 'transport-maritime-security',
    title: 'Transport & Maritime Security',
    icon: <Truck className="w-6 h-6 text-red-500" />,
    description: 'Security professionals protecting transportation systems and maritime assets.',
    roles: [
      { title: 'Maritime Security Officer (MSO)', description: 'Protects ships, ports, and maritime facilities.' },
      { title: 'Aviation Security Officer', description: 'Ensures security in airports and aircraft.' },
      { title: 'High-Value Goods Escort Officer', description: 'Provides security for valuable cargo transportation.' },
      { title: 'Secure Cash Transit Officer', description: 'Manages secure transportation of cash and valuables.' },
      { title: 'Security Escort Officer', description: 'Provides mobile security escort services.' },
      { title: 'Port Security Officer', description: 'Manages security operations at ports and harbors.' },
      { title: 'Fleet Security Manager', description: 'Oversees security for vehicle fleets.' },
      { title: 'Cargo Security Inspector', description: 'Inspects and secures cargo shipments.' },
      { title: 'Railway Protection Officer', description: 'Ensures security on railway systems.' },
      { title: 'Travel Risk Officer', description: 'Assesses and manages travel-related security risks.' }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Information Security (Coming Soon)',
    icon: <Lock className="w-6 h-6 text-yellow-500" />,
    description: 'Digital security experts protecting systems and networks.',
    roles: [
      { title: 'Cybersecurity Analyst', description: 'Monitors and protects against cyber threats.' },
      { title: 'Cybersecurity Consultant', description: 'Provides expert advice on digital security.' },
      { title: 'Ethical Hacker / Penetration Tester', description: 'Tests system security through controlled hacking.' },
      { title: 'Incident Response Analyst', description: 'Responds to and manages security incidents.' },
      { title: 'Security Operations Centre (SOC) Analyst', description: 'Monitors security operations in real-time.' },
      { title: 'Chief Information Security Officer (CISO)', description: 'Leads organizational security strategy.' },
      { title: 'Network Security Engineer', description: 'Designs and implements secure networks.' },
      { title: 'Cloud Security Specialist', description: 'Secures cloud-based systems and data.' },
      { title: 'IT Security Auditor', description: 'Assesses security controls and compliance.' },
      { title: 'Risk & Compliance Manager (Cybersecurity)', description: 'Manages security risks and compliance.' },
      { title: 'Identity and Access Management (IAM) Specialist', description: 'Manages digital access control systems.' }
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management & Consultancy (Coming Soon)',
    icon: <ChartBar className="w-6 h-6 text-indigo-500" />,
    description: 'Professionals focused on identifying and mitigating security risks.',
    roles: [
      { title: 'Security Risk Consultant', description: 'Advises on security risk management strategies.' },
      { title: 'Physical Security Consultant', description: 'Specializes in physical security solutions.' },
      { title: 'Risk Mitigation Consultant', description: 'Develops strategies to reduce security risks.' },
      { title: 'Business Continuity & Resilience Manager', description: 'Ensures business operations during crises.' },
      { title: 'Threat Intelligence Analyst', description: 'Analyzes and predicts security threats.' },
      { title: 'Counter-Terrorism Security Advisor (CTSA)', description: 'Provides anti-terrorism security guidance.' },
      { title: 'Crisis Management Consultant', description: 'Manages response to security crises.' },
      { title: 'Security Auditor', description: 'Conducts security assessments.' },
      { title: 'Fraud Prevention Specialist', description: 'Prevents and investigates fraud.' }
    ]
  },
  {
    id: 'private-investigation',
    title: 'Private Investigation & Specialist Roles (Coming Soon)',
    icon: <Search className="w-6 h-6 text-orange-500" />,
    description: 'Investigative professionals conducting private and corporate investigations.',
    roles: [
      { title: 'Private Investigator', description: 'Conducts private investigations.' },
      { title: 'Corporate Investigator', description: 'Investigates business-related incidents.' },
      { title: 'Insurance Fraud Investigator', description: 'Investigates insurance-related fraud.' },
      { title: 'Undercover Security Operative', description: 'Conducts covert security operations.' }
    ]
  },
  {
    id: 'access-technology',
    title: 'Access Technology & System Specialists (Coming Soon)',
    icon: <Key className="w-6 h-6 text-teal-500" />,
    description: 'Specialists in access control systems and security technology.',
    roles: [
      { title: 'Access Control Specialist', description: 'Manages access control systems.' },
      { title: 'Biometric Security Specialist', description: 'Implements biometric security solutions.' },
      { title: 'Drone Security Operator', description: 'Operates security drones and UAVs.' },
      { title: 'Alarm & Security Systems Engineer', description: 'Installs and maintains security systems.' },
      { title: 'Security Systems Integrator', description: 'Integrates various security technologies.' },
      { title: 'Fire & Safety Security Officer', description: 'Manages fire safety and emergency systems.' }
    ]
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: string, role: string) => void;
}

export default function SecurityCategoriesModal({ isOpen, onClose, onSelect }: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">
                <div>
                  <div className="text-center mb-8">
                    <Dialog.Title as="h3" className="text-3xl font-bold text-gray-900">
                      Security Professional Categories
                    </Dialog.Title>
                    <p className="mt-2 text-gray-600">Select a role to add to your job posting</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                              {category.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">{category.title}</h4>
                              {category.title.includes('Coming Soon') && (
                                <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                          
                          <div className="space-y-2">
                            {category.roles.map((role, index) => (
                              <div
                                key={index}
                                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 group"
                                onClick={() => !category.title.includes('Coming Soon') && onSelect(category.title, role.title)}
                              >
                                <h5 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{role.title}</h5>
                                <p className="text-sm text-gray-600 line-clamp-2">{role.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}