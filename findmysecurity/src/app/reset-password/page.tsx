// In pages/forget-password.tsx

import ForgetPassword from "@/sections/components/forgot-password/ForgotPassword";
import { Suspense } from 'react';


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<ForgetPassword />
  </Suspense>
  );
}
