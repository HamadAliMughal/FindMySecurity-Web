import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface MembershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelected: (plan: string) => void;
}

const MembershipDialog: React.FC<MembershipDialogProps> = ({ 
  isOpen, 
  onClose,
  onPlanSelected 
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-center text-indigo-900 mb-6"
                >
                  Choose Your Membership
                </Dialog.Title>

                {/* Plan Layout: Vertical on mobile, Horizontal on md+ */}
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                  {/* Basic Tier */}
                  <div className="flex-1 rounded-xl bg-white p-5 shadow-md border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Basic</h4>
                        <p className="text-indigo-600 font-bold">Free</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Current
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Limited access to essential features
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create a profile
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Receive messages from paying members
                      </li>
                    </ul>
                    <button 
                      className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => onPlanSelected('basic')}
                    >
                      Continue with Basic
                    </button>
                  </div>

                  {/* Standard Tier */}
                  <div className="flex-1 rounded-xl bg-white p-5 shadow-lg border-2 border-indigo-300 relative">
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Standard</h4>
                        <p className="text-indigo-600 font-bold">$8.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Full access to all job adverts
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Profile verification for credibility
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Increased visibility to stand out
                      </li>
                    </ul>
                    <button 
                      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => onPlanSelected('standard')}
                    >
                      Upgrade to Standard
                    </button>
                  </div>

                  {/* Premium Tier */}
                  <div className="flex-1 rounded-xl bg-white p-5 shadow-md border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Premium</h4>
                        <p className="text-indigo-600 font-bold">$14.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Full access to all platform features
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority placement in search results
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Enhanced verification for maximum credibility
                      </li>
                    </ul>
                    <button 
                      className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => onPlanSelected('premium')}
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                  >
                    Maybe later
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MembershipDialog;






// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';

// interface MembershipDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPlanSelected: (plan: string) => void;
// }

// const MembershipDialog: React.FC<MembershipDialogProps> = ({ 
//   isOpen, 
//   onClose,
//   onPlanSelected 
// }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-2xl font-bold text-center text-indigo-900 mb-6"
//                 >
//                   Choose Your Membership
//                 </Dialog.Title>

//                 <div className="space-y-4">
//                   {/* Basic Tier */}
//                   <div className="rounded-xl bg-white p-5 shadow-md border border-gray-200">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-900">Basic</h4>
//                         <p className="text-indigo-600 font-bold">Free</p>
//                       </div>
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                         Current
//                       </span>
//                     </div>
//                     <ul className="mt-3 space-y-2 text-sm text-gray-600">
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Limited access to essential features
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Create a profile
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Receive messages from paying members
//                       </li>
//                     </ul>
//                     <button 
//                       className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
//                       onClick={() => onPlanSelected('basic')}
//                     >
//                       Continue with Basic
//                     </button>
//                   </div>

//                   {/* Standard Tier */}
//                   <div className="rounded-xl bg-white p-5 shadow-lg border-2 border-indigo-300 relative">
//                     <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//                       POPULAR
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-900">Standard</h4>
//                         <p className="text-indigo-600 font-bold">$8.99<span className="text-sm font-normal text-gray-500">/month</span></p>
//                       </div>
//                     </div>
//                     <ul className="mt-3 space-y-2 text-sm text-gray-600">
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Full access to all job adverts
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Profile verification for credibility
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Increased visibility to stand out
//                       </li>
//                     </ul>
//                     <button 
//                       className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//                       onClick={() => onPlanSelected('standard')}
//                     >
//                       Upgrade to Standard
//                     </button>
//                   </div>

//                   {/* Premium Tier */}
//                   <div className="rounded-xl bg-white p-5 shadow-md border border-gray-200">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-900">Premium</h4>
//                         <p className="text-indigo-600 font-bold">$14.99<span className="text-sm font-normal text-gray-500">/month</span></p>
//                       </div>
//                     </div>
//                     <ul className="mt-3 space-y-2 text-sm text-gray-600">
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Full access to all platform features
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Priority placement in search results
//                       </li>
//                       <li className="flex items-start">
//                         <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Enhanced verification for maximum credibility
//                       </li>
//                     </ul>
//                     <button 
//                       className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//                       onClick={() => onPlanSelected('premium')}
//                     >
//                       Upgrade to Premium
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mt-6 text-center">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//                     onClick={onClose}
//                   >
//                     Maybe later
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default MembershipDialog;;