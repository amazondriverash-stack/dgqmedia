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

function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown">
      <TopTicker />
      <main id="main" aria-label="DGQ marketing homepage">
        <Hero />

        <Problems />
        <Solutions />
        <DuckMode />
        <Process />
        <PricingPackages />
        <BusinessGrowthSection />
        <Footer />
      </main>
      <QuackButton />
    </div>
  )
}

export default App
