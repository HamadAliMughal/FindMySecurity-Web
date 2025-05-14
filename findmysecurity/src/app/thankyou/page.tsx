import Thankyou from "@/sections/components/thankyou page/Thankyou";


import { Suspense } from 'react';


export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Thankyou />
    </Suspense>
  );
}


