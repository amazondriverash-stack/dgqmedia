import { useCallback, useState } from 'react'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import DuckMode from './components/DuckMode'
import Process from './components/Process'
import Footer from './components/Footer'
import BusinessGrowthSection from './components/BusinessGrowthSection'
import QuackButton from './components/QuackButton'
import TopTicker from './components/TopTicker'
import PricingPackages from './components/PricingPackages'
import OnboardingFormModal from './components/OnboardingFormModal'

function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const openOnboarding = useCallback(() => setOnboardingOpen(true), [])
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), [])

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown">
      <TopTicker />
      <main id="main" aria-label="DGQ marketing homepage">
        <Hero onStartOnboarding={openOnboarding} />

        <Problems />
        <Solutions />
        <DuckMode onStartOnboarding={openOnboarding} />
        <Process />
        <PricingPackages />
        <BusinessGrowthSection onStartOnboarding={openOnboarding} />
        <Footer />
      </main>
      <QuackButton />
      <OnboardingFormModal open={onboardingOpen} onClose={closeOnboarding} />
    </div>
  )
}

export default App
