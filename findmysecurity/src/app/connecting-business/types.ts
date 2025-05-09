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
  }
  
  export interface ProfileData {
    basicInfo?: {
      screenName?: string;
      profileHeadline?: string;
    };
    about?: {
      aboutMe?: string;
      experience?: string;
      qualifications?: string;
    };
    services?: {
      selectedServices?: string[];
    };
    fees?: {
      hourlyRate?: number;
    };
    contact?: {
      website?: string;
      homeTelephone?: string;
      mobileTelephone?: string;
    };
    profilePhoto?: string;
  }
  export interface Professional {
    id: number;
    userId: number;
    user: User;
    profileData?: ProfileData;
    createdAt: string;
  }
  
  export interface ApiResponse {
    totalCount: number;
    page: number;
    pageSize: number;
    professionals: Professional[];
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
    permissions: CompanyPermissions;
    createdAt: string;
    updatedAt: string;
    user: CompanyUser;
  }
  
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
  


  // export type ApiResponseUnion =
  // | ApiResponse             // has 'professionals'
  // | CompaniesApiResponse    // has 'companies'
  // | CourseProvidersApiResponse; // has 'courseProviders'
