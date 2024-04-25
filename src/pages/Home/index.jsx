import AppLayout from '../../components/Layout/AppLayout/AppLayout'
import AdsSection from '../../components/Shared/AdsSection'
import PartnersSection from '../../components/Shared/PartnersSection'
import Blogs from './components/Blogs'
import Hero from './components/Hero'
import AdsSectionTop from './components/AdsSectionTop'

const Home = () => {
  return (
    <div>
      <AppLayout>
        <Hero />
        <AdsSectionTop />
        <Blogs />
        <AdsSection />
        <PartnersSection />
      </AppLayout>
    </div>
  )
}

export default Home
