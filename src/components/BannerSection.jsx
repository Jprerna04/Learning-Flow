import React from 'react';
import bannerImg from '../assets/banner.jpg';

export default function BannerSection() {
  return (
    <section className="banner-section wrap">
      <img className="banner-img" src={bannerImg} alt="Learning Flow Banner" />
    </section>
  );
}
