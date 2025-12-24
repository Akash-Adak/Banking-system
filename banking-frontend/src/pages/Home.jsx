import PublicLayout from "../layout/PublicLayout";

import HeroSection from "../components/homepage/HeroSection.jsx";

import QuickServices from "../components/homepage/QuickServices.jsx";
import FeaturesCarousel from "../components/homepage/FeaturesCarousel.jsx";

import PremiumCards from "../components/homepage/PremiumCards.jsx";
import LoanProducts from "../components/homepage/LoanProducts.jsx";
import Testimonials from "../components/homepage/Testimonials.jsx";
import FinalCTA from "../components/homepage/FinalCTA.jsx";

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />

      <QuickServices />
       <PremiumCards />
      <FeaturesCarousel />
    
        <section id="loan">
          <LoanProducts />
      </section>
      <Testimonials />
      <FinalCTA />
    </PublicLayout>
  );
}