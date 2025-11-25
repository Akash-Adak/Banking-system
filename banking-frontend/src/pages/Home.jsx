import PublicLayout from "../layout/PublicLayout";
import LiveRatesTicker from "../components/homepage/LiveRatesTicker.jsx";
import HeroSection from "../components/homepage/HeroSection.jsx";
import BankStats from "../components/homepage/BankStats.jsx";
import QuickServices from "../components/homepage/QuickServices.jsx";
import FeaturesCarousel from "../components/homepage/FeaturesCarousel.jsx";
import BankingProducts from "../components/homepage/BankingProducts.jsx";
import PremiumCards from "../components/homepage/PremiumCards.jsx";
import LoanProducts from "../components/homepage/LoanProducts.jsx";
import Testimonials from "../components/homepage/Testimonials.jsx";
import FinalCTA from "../components/homepage/FinalCTA.jsx";

export default function Home() {
  return (
    <PublicLayout>
      <LiveRatesTicker />
      <HeroSection />
      <BankStats />
      <QuickServices />
      <FeaturesCarousel />
      <BankingProducts />
      <PremiumCards />
      <LoanProducts />
      <Testimonials />
      <FinalCTA />
    </PublicLayout>
  );
}