import { Suspense } from 'react';
import ProfessionalsPage from '@/sections/components/professionals-listing/professionals';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfessionalsPage />
    </Suspense>
  );
}
