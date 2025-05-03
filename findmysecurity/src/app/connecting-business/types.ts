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
  