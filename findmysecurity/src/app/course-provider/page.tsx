import CourseProviderList from '@/sections/components/course-providerListing/CourseProviderList';
import { Suspense } from 'react';


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseProviderList />
    </Suspense>
  );
}
