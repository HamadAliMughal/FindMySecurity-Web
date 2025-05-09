import { ApiResponse, CompaniesApiResponse, CourseProvidersApiResponse } from '@/app/connecting-business/types';

export function isProfessionalResponse(data: any): data is ApiResponse {
  return data && 'professionals' in data;
}

export function isCompanyResponse(data: any): data is CompaniesApiResponse {
  return data && 'companies' in data;
}

export function isProviderResponse(data: any): data is CourseProvidersApiResponse {
  return data && 'providers' in data;
}