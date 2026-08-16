import React, { useState } from 'react';

export default function PillarsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="pillars-section wrap">
      <div className="learn-more-wrapper">
        <button
          type="button"
          className={`learn-more-btn ${isExpanded ? 'active' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <svg
            className={`arrow-icon ${isExpanded ? 'rotate' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isExpanded && (
          <div className="lf-info-block animate-fade-in">
            <div className="lf-info-header">
              <span className="lf-badge">LinkedIn Content Initiative</span>
              <h2>Empowering Data &amp; AI Professionals</h2>
              <p className="lf-tagline">
                Learning Flow is a free, specialized LinkedIn initiative delivering role-tailored insights, skill-building resources, and strategic guidance for corporate professionals.
              </p>
            </div>

            <div className="lf-roles-container">
              <span className="lf-roles-title">Tailored For Key Roles:</span>
              <div className="lf-roles-grid">
                <span className="role-chip">Data Analysts</span>
                <span className="role-chip">Data Architects</span>
                <span className="role-chip">Data Scientists</span>
                <span className="role-chip">Machine Learning Engineers</span>
                <span className="role-chip">Data Engineers</span>
                <span className="role-chip">AI Engineers</span>
                <span className="role-chip">Data Owners</span>
                <span className="role-chip">AI Product Owners</span>
                <span className="role-chip">FinOps Engineers</span>
              </div>
            </div>

            <div className="lf-pillars-grid">
              <div className="lf-pillar-card">
                <div className="pillar-icon">🎯</div>
                <h3>Role-Specific Insights</h3>
                <p>Curated content aligned with the distinct needs of each job role in the evolving AI-driven corporate landscape.</p>
              </div>

              <div className="lf-pillar-card">
                <div className="pillar-icon">💡</div>
                <h3>Continuous Learning</h3>
                <p>Stay updated on emerging technologies, best practices, and strategic trends with zero cost barriers.</p>
              </div>

              <div className="lf-pillar-card">
                <div className="pillar-icon">🤝</div>
                <h3>Engaged Community</h3>
                <p>Leveraging LinkedIn’s platform strengths to foster meaningful connections, trust, and authority.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

