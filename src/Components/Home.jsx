import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";  
import bmwcoupe from "../assets/bmwcoupe.jpeg";
import bmwelectric from "../assets/bmwelectric.jpeg";
import bmwsuv from "../assets/bmwsuv.jpeg";

const cars = [
  {
    name: "BMW M4", 
    type: "PETROL",
    image: bmwcoupe,
    Link: "/BMWM"
  },
  {
    name: "BMW i7",
    type: "ELECTRIC",
    image: bmwelectric,
    Link: "/BMWElectric"
  },
  {
    name: "BMW X7",
    type: "DIESEL",
    image: bmwsuv,
    Link: "/XModels"
  },
];

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="eyebrow">THE ULTIMATE DRIVING MACHINE</p>

          <h1 className="hero-title">
            When POWER
            <br />
            <span>Meets PRECISION.</span>
          </h1>

          <p className="hero-description">
            Discover a new generation of performance, luxury and intelligent
            mobility engineered for those who refuse to compromise.
          </p>

          <div className="hero-buttons">
            <Link to = "/categories">
              <button className="primary-btn">
                Explore Models
                <span>↗</span>
              </button>
            </Link>
            <Link to = "/gallery ">
              <button className="primary-btn discover-btn">
                Discover BMW
                <span>↗</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </div>

        <div className="hero-number">01 / 04</div>
      </section>

      {/* MODELS */}
      <section className="models-section" id="models">

        <div className="section-heading">
          <h2>FIND YOUR PERFECT BMW</h2>
        </div>

        <div className="cars-grid">
          {cars.map((car, index) => (
            <article className="car-card" key={car.name}>

              <div className="car-image">
                <Link to={car.Link}>
                  <img src={car.image} alt={car.name} />
                </Link>

                <div className="car-number">
                  0{index + 1}
                </div>

                <div className="car-arrow">↗</div>
              </div>

              <div className="car-info">
                <p>{car.type}</p>
                <h3>{car.name}</h3>
              </div>

            </article>
          ))}
        </div>

        <div className="center-button">
          <Link to = "/categories">
            <button className="outline-btn">
              View All Models <span>→</span>
            </button>
          </Link>
        </div>

      </section>

      {/* EXPERIENCE */}
      <section className="experience" id="experience">

        <div className="experience-image">
          <div className="experience-overlay"></div>
        </div>

        <div className="experience-content">

          <p className="eyebrow">THE BMW EXPERIENCE</p>

          <h2>
            BUILT FOR
            <br />
            <span>THE MOMENT.</span>
          </h2>

          <p>
            Every BMW is designed around one simple idea: driving should feel
            extraordinary. Precision engineering, intelligent technology and
            unmistakable design come together to create something more than a
            car.
          </p>

          <Link to = "/categories">
          <button className="primary-btn">
            Experience BMW <span>↗</span>
          </button>
          </Link>

        </div>
      </section>

      {/* PERFORMANCE */}
<section className="performance" id="technology">

  {/* Feature Row */}
  <div className="performance-features">

    <div className="performance-feature">
      <div className="feature-icon">◉</div>
      <h3>POWERFUL PERFORMANCE</h3>
      <p>
        Engineered for precision.<br />
        Born for excitement.
      </p>
    </div>

    <div className="performance-feature">
      <div className="feature-icon">ϟ</div>
      <h3>ELECTRIC INNOVATION</h3>
      <p>
        Cutting-edge technology<br />
        for a sustainable future.
      </p>
    </div>

    <div className="performance-feature">
      <div className="feature-icon">◇</div>
      <h3>LUXURY REDEFINED</h3>
      <p>
        Crafted with premium materials<br />
        and attention to detail.
      </p>
    </div>

    <div className="performance-feature">
      <div className="feature-icon">✓</div>
      <h3>SAFETY FIRST</h3>
      <p>
        Intelligent systems that<br />
        protect what matters.
      </p>
    </div>

  </div>


  {/* Bottom Message */}
  <div className="performance-bottom">

    <h2>
      BORN FOR PERFORMANCE.
      <br />
      BUILT FOR YOU.
    </h2>  

  </div>

  {/* Light Beams */}
  <div className="light-beams">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

</section>

{/* CTA */}
<section className="final-cta" id="contact">
  <div className="cta-bg-image"></div>

  <div className="cta-content">
    <p className="eyebrow">EXPERIENCE THE GERMAN POWER</p>

    <h2 className="cta-title">
      READY TO
      <br />
      
    </h2>
    <h2 className="drive"> DRIVE </h2>


    <Link to="/bookride">
    <button className="bookridebutton">
      BOOK A RIDE <span>↗</span>
    </button>
    </Link>
  </div>
</section>

      <footer className="footerS">
        <div className="copyright">
          © 2026 BMW. All rights reserved by Sujal Verma. Designed and developed by Sujal Verma.
        </div>

      </footer>

    </main>
  );
}
