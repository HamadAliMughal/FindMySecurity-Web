import BusinessSection from '@/sections/Business'
import TrustedCompanies from '@/sections/Companies'
import Hero from '@/sections/Hero'
import SecurityAppSection from '@/sections/SecurityApp'
import SecurityFeatures from '@/sections/SecurityFeatures'
import StepsSection from '@/sections/StepSection'

export default function Home() {
  return (
    <div>
    <Hero/>
    <TrustedCompanies/>
    <SecurityAppSection/>
    <BusinessSection/>
    <StepsSection/>
    <SecurityFeatures/>
    </div>

  )
  }
