"use client";

import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Rolit AI - Making Content Creation Truly AI-Native",
    category: "AI",
    description: "From a feature-rich AI generator to the definitive go-to platform for creators — built on persistent creator memory, multi-agent orchestration, and proprietary style flywheels.",
    tech: ["Python", "TensorFlow", "React", "AWS"],
    impact: "Persistent creator memory & multi-agent orchestration, purpose-built for creators",
    link: "https://rolit.ai/"
  },
  {
    id: 2,
    title: "PG Market place",
    category: "Distributed Systems",
    description: "Trovare helps you find the best paying guest (PG) accommodations in Bangalore. Browse verified PGs near IT parks, Koramangala, and Indiranagar.",
    tech: ["Next.js", "Node.js", "JAVA"],
    impact: "1000+ active users",
    link: "https://trovare.in/"
  },
  {
    id: 7,
    title: "Mr. Ads - In-Restaurant Digital Ad Network",
    category: "Marketing",
    description: "Mr. Ads helps brands connect with customers inside high-footfall restaurants across Bengaluru. Our digital displays are placed in dining and waiting areas, ensuring your brand gets repeated visibility when customers are relaxed and attentive. Ads play every 5 minutes, ensuring repeated visibility during dining time.",
    tech: ["Digital Signage", "Next.js", "Node.js"],
    impact: "Repeated visibility across high-footfall restaurants in Bengaluru",
    link: "https://mr-ads.in/"
  },
  {
    id: 3,
    title: "FinTech Mobile Ecosystem",
    category: "Mobile",
    description: "End-to-end mobile banking solution with biometric security and real-time transactions.",
    tech: ["React Native", "Node.js", "GraphQL"],
    impact: "1000+ active users"
  },
  {
    id: 4,
    title: "E-Commerce SEO Overhaul",
    category: "Web",
    description: "Complete platform re-engineering focusing on Core Web Vitals and SEO performance.",
    tech: ["Next.js", "Vercel", "Sanity CMS"],
    impact: "300% increase in organic traffic"
  },
  {
    id: 5,
    title: "Cloud Infrastructure Modernization",
    category: "Cloud",
    description: "Migration of legacy on-prem systems to a cloud-native serverless architecture.",
    tech: ["AWS Lambda", "Terraform", "Docker"],
    impact: "50% cost savings"
  },
  {
    id: 6,
    title: "AIOps Monitoring Pipeline",
    category: "DevOps",
    description: "Intelligent monitoring system using AI to predict and prevent system outages.",
    tech: ["Prometheus", "Grafana", "Python"],
    impact: "Reduced MTTR by 60%"
  }
];

const categories = ["All", "AI", "Distributed Systems", "Mobile", "Web", "Cloud", "DevOps", "Marketing"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="portfolio-page">
      {/* Portfolio Hero */}
      <section className="hero-section">
        <div className="container">
          <h1 className="page-title">Our Work</h1>
          <p className="page-subtitle">Engineering That Scales. Results That Matter.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <div className="container">
          <div className="filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="card-header">
                  <span className="category-tag">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className="description">{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="impact">
                    <strong>Impact:</strong> {project.impact}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-project-btn"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Have a project in mind?</h2>
          <a href="/#contact" className="btn btn-primary">Let's Build It</a>
        </div>
      </section>

      <style jsx>{`
        .portfolio-page {
          padding-top: 80px;
          min-height: 100vh;
        }
        .hero-section {
          padding: 4rem 0;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(10, 25, 47, 0.5) 0%, transparent 70%);
        }
        .page-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--color-saffron);
        }
        .page-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.2rem;
        }
        .filter-section {
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--color-saffron);
          color: #000;
          border-color: var(--color-saffron);
          box-shadow: 0 0 10px var(--color-saffron-glow);
        }
        .projects-section {
          padding: 4rem 0;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .project-card {
          background: var(--gradient-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 2rem;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-saffron);
        }
        .card-header {
          margin-bottom: 1rem;
        }
        .category-tag {
          font-size: 0.8rem;
          color: var(--color-blue-neon);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 0.5rem;
        }
        .project-card h3 {
          font-size: 1.5rem;
          color: #fff;
        }
        .description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex-grow: 1;
        }
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .tech-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .card-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .impact {
          color: var(--color-saffron);
          font-size: 0.9rem;
        }
        .view-project-btn {
          flex-shrink: 0;
          color: var(--color-blue-neon);
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .view-project-btn:hover {
          color: var(--color-saffron);
        }
        .cta-section {
          text-align: center;
          padding: 4rem 0;
          background: rgba(255, 255, 255, 0.02);
        }
        .cta-section h2 {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
