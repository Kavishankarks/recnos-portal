import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Our Expertise Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">Our Expertise</h2>
          <div className="grid">
            <div className="card">
              <h3>AI Foundation Software</h3>
              <p>Building intelligent agent systems and foundation models for enterprise automation.</p>
            </div>
            <div className="card">
              <h3>Distributed Systems</h3>
              <p>Scalable backend architectures, microservices, and event-driven systems.</p>
            </div>
            <div className="card">
              <h3>DevOps & AIOps</h3>
              <p>Automated CI/CD pipelines, monitoring, and AI-driven operations.</p>
            </div>
            <div className="card">
              <h3>Mobile & Web</h3>
              <p>High-performance iOS/Android apps and SEO-optimized web platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why RECNOS Section */}
      <section className="section bg-dark">
        <div className="container">
          <h2 className="section-title">Why RECNOS?</h2>
          <div className="features">
            <div className="feature">
              <h3>Engineering Excellence</h3>
              <p>We prioritize code quality, scalability, and long-term maintainability.</p>
            </div>
            <div className="feature">
              <h3>Security First</h3>
              <p>Enterprise-grade security integrated into every layer of the stack.</p>
            </div>
            <div className="feature">
              <h3>Performance</h3>
              <p>Optimized for speed, reliability, and high-concurrency workloads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Technologies We Use</h2>
          <div className="tech-grid">
            <div className="tech-item">Java</div>
            <div className="tech-item">Python</div>
            <div className="tech-item">Go</div>
            <div className="tech-item">Deployment</div>
            <div className="tech-item">AI/ML</div>
            <div className="tech-item">Node.js</div>
            <div className="tech-item">TensorFlow</div>
            <div className="tech-item">PyTorch</div>
            <div className="tech-item">Kubernetes</div>
            <div className="tech-item">Docker</div>
            <div className="tech-item">AWS</div>
            <div className="tech-item">GCP</div>
            <div className="tech-item">Next.js</div>
            <div className="tech-item">React Native</div>
            <div className="tech-item">Kafka</div>
            <div className="tech-item">Redis</div>
            <div className="tech-item">PostgreSQL</div>
            <div className="tech-item">Terraform</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="section bg-dark"> */}
      {/* <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials">
            <div className="testimonial-card">
              <p>"RECNOS transformed our legacy infrastructure into a scalable, AI-driven platform. The performance gains were immediate."</p>
              <h4>- CTO, FinTech Corp</h4>
            </div>
            <div className="testimonial-card">
              <p>"Their expertise in distributed systems and mobile development helped us launch our app to millions of users seamlessly."</p>
              <h4>- Founder, HealthTech Startup</h4>
            </div>
          </div>
        </div> */}
      {/* </section> */}

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Build with RECNOS</h2>
            <p>Ready to engineer the future? Let's discuss your project.</p>

            {/* Google Calendar Appointment Scheduling */}
            <div style={{ margin: '2rem 0', width: '100%' }}>
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0G0XnyW8usBYIMjx0Nz8Iy_6h9foZJudVZi2LpH2XezXViud_Ceu0qYX2OM7HNMVJacMK6Kvta?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule an appointment"
              ></iframe>
            </div>

            <div className="contact-details">
              <a href="mailto:dev@recnos.com" className="contact-item">
                <span className="label">Email:</span> dev@recnos.com
              </a>
              {/* <a href="tel:+918296863611" className="contact-item">
                <span className="label">Call:</span> +91 8296863611
              </a> */}
            </div>
            <a href="mailto:dev@recnos.com" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </section>

    </>
  );
}
