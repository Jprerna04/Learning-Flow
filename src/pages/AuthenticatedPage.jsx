import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function AuthenticatedPage() {
  const { user, logout, setCurrentPage } = useAuth();
  const [expandedZone, setExpandedZone] = useState(null); // null | 'zone1' | 'zone2'

  const userName = user?.name || 'Member';

  return (
    <div className="authenticated-dashboard">
      <Header />

      <main className="dashboard-container">
        {/* Hero Section */}
        <div className="dashboard-hero wrap">
          <div className="dashboard-eyebrow">Dashboard</div>
          <h1 className="dashboard-title">Where would you like to grow today?</h1>
          <p className="dashboard-sub">
            Pick a zone below to continue your journey — explore your changed role, or simulate how it works on the ground.
          </p>
        </div>

        {/* Card Grid */}
        <div className="dashboard-grid wrap">
          {/* CARD 1: Career Exploration Zone */}
          <div className="zone-card">
            <div className="zone-index">Zone 01</div>
            <h2>Career Exploration Zone</h2>
            <p className="desc">Discover how roles are evolving and where your skills fit next.</p>

            <div className="subcard">
              <div className="subcard-inner">
                <h3 className="subcard-title">Know Your Changed Role</h3>
                <p className="subcard-desc">
                  Understand how your role is shifting, what's changing day to day, and the skills that matter next.
                </p>
                <button
                  type="button"
                  className="subcard-cta"
                  onClick={() => setExpandedZone(expandedZone === 'zone1' ? null : 'zone1')}
                >
                  {expandedZone === 'zone1' ? 'Collapse view ↑' : 'Start here →'}
                </button>
              </div>
            </div>

            {expandedZone === 'zone1' && (
              <div className="zone-expanded-view animate-fade-in">
                <div className="expanded-badge font-serif">Resource Library</div>
                <h4>Know Your Changed Role — PDF Carousels</h4>
                <p>Browse and download role transition playbooks, skill maps, and daily workflow shift summaries.</p>
                <div className="resource-list">
                  <div className="resource-item">
                    <span className="res-icon">📄</span>
                    <div className="res-meta">
                      <strong>Data Analyst → AI Insights Strategist</strong>
                      <span>PDF Playbook • 12 Pages</span>
                    </div>
                  </div>
                  <div className="resource-item">
                    <span className="res-icon">📄</span>
                    <div className="res-meta">
                      <strong>Data Engineer → AI Infrastructure Engineer</strong>
                      <span>PDF Playbook • 16 Pages</span>
                    </div>
                  </div>
                  <div className="resource-item">
                    <span className="res-icon">📄</span>
                    <div className="res-meta">
                      <strong>Software Engineer → AI-Augmented Engineer</strong>
                      <span>PDF Playbook • 14 Pages</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD 2: Industry Simulation Zone */}
          <div className="zone-card">
            <div className="zone-index">Zone 02</div>
            <h2>Industry Simulation Zone</h2>
            <p className="desc">Practice the real tools and techniques used in your target role.</p>

            <div className="subcard">
              <div className="subcard-inner">
                <h3 className="subcard-title">Prompting Techniques for Your Changed Role</h3>
                <p className="subcard-desc">
                  Hands-on prompt experience tailored to the role you're transitioning into — practice, refine, and apply.
                </p>
                <button
                  type="button"
                  className="subcard-cta"
                  onClick={() => setExpandedZone(expandedZone === 'zone2' ? null : 'zone2')}
                >
                  {expandedZone === 'zone2' ? 'Collapse simulation ↑' : 'Start simulation →'}
                </button>
                <div className="meta-row">
                  <div className="meta-pill">
                    <span className="dot"></span>12 prompt exercises
                  </div>
                  <div className="meta-pill">
                    <span className="dot"></span>Role-matched
                  </div>
                </div>
              </div>
            </div>

            {expandedZone === 'zone2' && (
              <div className="zone-expanded-view animate-fade-in">
                <div className="expanded-badge font-serif">Interactive Practice Hub</div>
                <h4>Prompt Engineering Simulation</h4>
                <p>12 scenario-based prompting exercises integrated with Claude AI practice environment.</p>
                <div className="simulation-preview-box">
                  <div className="sim-badge">Exercise 1 of 12</div>
                  <h5>Contextual Prompting for AI Data Summarization</h5>
                  <p className="sim-instruction">
                    Task: Draft a system prompt that forces LLMs to format tabular data into executive summaries without hallucinating metrics.
                  </p>
                  <button type="button" className="sim-run-btn">
                    Launch Interactive Studio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
