import HeroSection from './components/HeroSection'
import TopProducts from './components/TopProducts'
import ExploreMore from './components/ExploreMore'
import About from './components/About'
import FeaturedTreats from './components/FeaturedTreats'

export default function Home() {
  return (
    <>{/**all components is displayed*/}
      <HeroSection />
      <TopProducts />
      <ExploreMore />
      <About />
      <FeaturedTreats />
    </>
  )
}

