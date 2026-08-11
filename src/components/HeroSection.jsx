import React from 'react';
import RoleMorphPanel from './RoleMorphPanel';

export default function HeroSection() {
  return (
    <section className="hero wrap">
      <span className="eyebrow">Coming soon</span>
      <h1 className="display">
        Your role is already <em>changing.</em>
      </h1>
      <p className="subhead">
        Learning Flow is an AI-powered career development platform built to help Data &amp; AI professionals navigate what comes next — before it catches up with them.
      </p>

      <RoleMorphPanel />
    </section>
  );
}
