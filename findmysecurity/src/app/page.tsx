import BusinessSection from '@/sections/Business'
import TrustedCompanies from '@/sections/Companies'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import SecurityAppSection from '@/sections/SecurityApp'
import StepsSection from '@/sections/StepSection'

export default function Home() {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <TrustedCompanies/>
    <SecurityAppSection/>
    <BusinessSection/>
    <StepsSection/>
    </div>

  )
  }
