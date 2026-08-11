import React from 'react';
import pillarsImg from '../assets/pillars.png';

export default function PillarsSection() {
  return (
    <section className="pillars-section wrap">
      <img className="pillars-img" src={pillarsImg} alt="Learning Flow Pillars" />
    </section>
  );
}
