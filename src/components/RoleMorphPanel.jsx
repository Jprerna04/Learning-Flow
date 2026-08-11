import React, { useState, useEffect } from 'react';

const PAIRS = [
  ["Data Analyst", "AI Insights Strategist"],
  ["Software Engineer", "AI-Augmented Engineer"],
  ["Support Agent", "AI Experience Orchestrator"],
  ["Marketing Manager", "AI Growth Strategist"],
  ["Recruiter", "Talent Intelligence Lead"],
  ["Financial Analyst", "AI Risk & Insights Analyst"],
  ["Professionals", "Data Annotator"]
];

export default function RoleMorphPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % PAIRS.length);
        setIsVisible(true);
      }, 220);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const [oldRole, newRole] = PAIRS[currentIndex];

  return (
    <div className="morph-panel">
      <div className="morph-label">Know your changed role</div>
      <div className={`morph-row ${isVisible ? 'show' : ''}`}>
        <span className="morph-old">{oldRole}</span>
        <span className="morph-arrow">&#8594;</span>
        <span className="morph-new">{newRole}</span>
      </div>
    </div>
  );
}
