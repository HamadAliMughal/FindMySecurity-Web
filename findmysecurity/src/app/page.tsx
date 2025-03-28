import BusinessSection from '@/sections/Business'
import TrustedCompanies from '@/sections/Companies'
import GetStarted from '@/sections/GetStarted'
import Hero from '@/sections/Hero'
import SecurityAppSection from '@/sections/SecurityApp'
import SecurityCompanies from '@/sections/SecurityCompanies'
import SecurityFeatures from '@/sections/SecurityFeatures'
import StepsSection from '@/sections/StepSection'
import Testimonials from '@/sections/Testimonials'
import TrainingProviders from '@/sections/TrainingProviders'

export default function Home() {
  return (
    <div>
    <Hero/>
    <TrustedCompanies/>
    <SecurityCompanies/>
    <GetStarted/>
    {/* <SecurityAppSection/> */}
    <TrainingProviders/>
    <Testimonials/>
    {/* <BusinessSection/> */}
    {/* <StepsSection/> */}
    {/* <SecurityFeatures/> */}
    </div>

  )
  }
