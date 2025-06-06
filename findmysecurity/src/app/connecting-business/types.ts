export interface MarkerData {
    id: number;
    position: { lat: number; lng: number };
    title: string;
  }
  
  export interface SearchValues {
    lookingFor?: string;
    jobTitle?: string;
    experience?: string;
    location?: string;
    postcode?: string;
    [key: string]: any;
  }
  
  export interface LookingForItem {
    title: string;
    id: string;
    roles: string[];
  }
  
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    screenName: string;
    phoneNumber: string;
    address: string;
    email: string;
    validated: boolean;
     profile: string;
  }
  

 export interface Profile {
  id: number;
  individualProfessionalId: number;
  hourlyRate: string;
  feesDescription: string | null;
  aboutMe: string;
  experience: string;
  qualifications: string;
  website: string;
  homeTelephone: string;
  mobileTelephone: string;
  otherService: string;
  serviceRequirements: string[];
  securityServicesOfferings: string[];
  gender: string;
  postcode: string;
  screenName: string;
  profilePhoto: string;
  profileHeadline: string;
  availabilityDescription: string | null;

  createdAt: string; // ISO 8601 Date string
  updatedAt: string; // ISO 8601 Date string
}
  export interface Professional {
    permissions: boolean;
    name: any;
    id: number;
    userId: number;
    user: User;
    profile?: Profile;
    createdAt: string;
  }
  // types.ts
export interface ApiResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  count: number;
  lastPage: number;
  professionals: Professional[];
}

export interface Professional {
  id: number;
  individualProfessionalId: number;
  hourlyRate: string;
  aboutMe?: string;
  availabilityDescription?: string | null;
  createdAt: string;
  experience?: string;
  feesDescription?: string | null;
  gender?: string;
  homeTelephone?: string;
  mobileTelephone?: string;
  otherService?: string;
  postcode?: string;
  profileHeadline?: string;
  profilePhoto?: string;
  qualifications?: string;
  screenName?: string;
  securityServicesOfferings: string[];
  serviceRequirements?: string[];
  updatedAt: string;
  website?: string;
  weeklySchedule?: {
    Evening?: Record<string, boolean>;
    Afternoon?: Record<string, boolean>;
    Morning?: Record<string, boolean>;
    Overnight?: Record<string, boolean>;
  };
  individualProfessional: {
    id: number;
    userId: number;
    permissions: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    user?: {
      firstName?: string;
      lastName?: string;
      address?: string;
    };
  };
}
  



  // Company 

  export interface CompaniesApiResponse {
    providers: any;
    totalCount: number;
    page: number;
    pageSize: number;
    companies: Company[];
  }
 
  export interface Company {
    name: any;
    id: number;
    userId: number;
    companyName: string;
    registrationNumber: string;
    address: string;
    postCode: string;
    contactPerson: string;
    jobTitle: string;
    phoneNumber: string;
    website: string;
    servicesRequirements: string[];
    securityServicesOfferings: { role: string; title?: string }[]; // Update type
    permissions: CompanyPermissions;
    createdAt: string;
    updatedAt: string;
    user: CompanyUser;
  }
  // export interface Company {
  //   name: any;
  //   id: number;
  //   userId: number;
  //   companyName: string;
  //   registrationNumber: string;
  //   address: string;
  //   postCode: string;
  //   contactPerson: string;
  //   jobTitle: string;
  //   phoneNumber: string;
  //   website: string;
  //   servicesRequirements: string[];
  //   securityServicesOfferings: string[];
  //   permissions: CompanyPermissions;
  //   createdAt: string;
  //   updatedAt: string;
  //   user: CompanyUser;
  // }
  
  export interface CompanyPermissions {
    canPostAd?: boolean;
    canEditProfile?: boolean;
    acceptTerms?: boolean;
    acceptEmails?: boolean;
    premiumServiceNeed?: boolean;
  }
  
  export interface CompanyUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profile: string | null;
    screenName: string;
    phoneNumber: string;
    dateOfBirth: string | null;
    address: string | null;
    postcode: string | null;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    validated: boolean;
  }



  // Course Providers


  export interface CourseProvidersApiResponse {
    totalCount: number;
    page: number;
    pageSize: number;
    providers: CourseProvider[];
  }
  
  export interface CourseProvider {
    name: any;
    organizationName: any;
    id: number;
    userId: number;
    companyName: string;
    registrationNumber: string;
    address: string;
    postCode: string;
    contactPerson: string;
    jobTitle: string;
    phoneNumber: string;
    website: string;
    servicesRequirements: string[];
    securityServicesOfferings: string[];
    permissions: CourseProviderPermissions;
    createdAt: string;
    updatedAt: string;
    user: CourseProviderUser;
  }
  
  export interface CourseProviderPermissions {
    acceptTerms?: boolean;
    acceptEmails?: boolean;
    premiumServiceNeed?: boolean;
  }
  
  export interface CourseProviderUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profile: string | null;
    screenName: string | null;
    phoneNumber: string;
    dateOfBirth: string | null;
    address: string;
    postcode: string | null;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    validated: boolean;
  }
  
// src/types/company.ts
export interface Permissions {
  acceptTerms: boolean;
  acceptEmails: boolean;
  premiumServiceNeed: boolean;
}

export interface SecurityCompany {
  id: number;
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  registrationNumber: string;
  website: string;
  servicesRequirements: string[];
  securityServicesOfferings: string[];
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CorporateClient {
  id: number;
  userId: number;
  companyName: string;
  registrationNumber: string;
  address: string;
  postCode: string;
  industryType: string;
  contactPerson: string;
  jobTitle: string;
  phoneNumber: string;
  website: string;
  serviceRequirements: string[];
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
}

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  role: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  validated: boolean;
  isSubscriber: boolean;
  subscriptionTier: string | null;
  securityCompany: SecurityCompany | null;
  corporateClient: CorporateClient | null;
  profile: { profilePhoto?: string } | null;
}

// export interface Company {
//   securityCompany?: SecurityCompany;
//   corporateClient?: CorporateClient;
//   user: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     address: string | null;
//     role: string;
//     roleId: number;
//     createdAt: string;
//     updatedAt: string;
//     validated: boolean;
//     isSubscriber: boolean;
//     subscriptionTier: string | null;
//   };
//   profile?: {
//     profilePhoto?: string;
//   };
// }

  // export type ApiResponseUnion =
  // | ApiResponse             // has 'professionals'
  // | CompaniesApiResponse    // has 'companies'
  // | CourseProvidersApiResponse; // has 'courseProviders'
