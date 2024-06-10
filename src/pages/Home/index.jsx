import AppLayout from "../../components/Layout/AppLayout.jsx";
import AdsSection from "../../components/Shared/AdsSection.jsx";
import PartnersSection from "../../components/Shared/PartnersSection.jsx";
import Blogs from "./components/Blogs.jsx";
import Hero from "./components/Hero.jsx";
import AdsSectionTop from "./components/AdsSectionTop.jsx";

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
  );
};

export default Home;
