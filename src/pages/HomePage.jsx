import React from 'react';
import Header from '../components/Header';
import BannerSection from '../components/BannerSection';
import HeroSection from '../components/HeroSection';
import PillarsSection from '../components/PillarsSection';
import WaitlistForm from '../components/WaitlistForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <BannerSection />
      <HeroSection />
      <PillarsSection />
      <WaitlistForm />
      <Footer />
    </>
  );
}
