import SecurityCompaniesPage from '@/sections/components/modal/security-companies-listing/companiesListing';
import { Suspense } from 'react';


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SecurityCompaniesPage />
    </Suspense>
  );
}
