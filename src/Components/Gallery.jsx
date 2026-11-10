import { useState, useEffect, useCallback, useRef } from "react";
import "./Gallery.css";
import blackbmwg from "../assets/blackbmwg.png"

/**
 * BMW Gallery — a full showcase page.
 * Drop into any React app. Needs GalleryPage.css alongside it.
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1728060838342-cb9744a27d1b?auto=format&fit=crop&w=2000&q=80";

const CARS = [
  {
    id: "m3-forest",
    model: "M3 Competition",
    caption: "Forest Run",
    spec: "510 hp · 3.9s 0–100",
    tag: "M Series",
    span: "tall",
    src: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m3-coupe-road",
    model: "M3 Coupé",
    caption: "Urban Prowl",
    spec: "503 hp · RWD",
    tag: "Coupé",
    span: "wide",
    src: "https://images.unsplash.com/photo-1603189617530-6d32306f57c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m2-blue",
    model: "M2",
    caption: "Estoril Blue",
    spec: "460 hp · 3-door",
    tag: "M Series",
    span: "normal",
    src: "https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m3-touring",
    model: "M3 Touring",
    caption: "Alpine Line",
    spec: "510 hp · Estate",
    tag: "M Series",
    span: "normal",
    src: "https://images.unsplash.com/photo-1600268330186-76564be81357?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m4-field",
    model: "M4 Coupé",
    caption: "Open Ground",
    spec: "480 hp · Twin-turbo",
    tag: "Coupé",
    span: "wide",
    src: "https://images.unsplash.com/photo-1603189661342-e45f1374f890?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m8-red",
    model: "M8 Gran Coupé",
    caption: "Imola Red",
    spec: "617 hp · 4 doors",
    tag: "M Series",
    span: "tall",
    src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3series-street",
    model: "3 Series",
    caption: "City Line",
    spec: "255 hp · Sedan",
    tag: "Coupé",
    span: "normal",
    src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m3-daylight",
    model: "M3 Sedan",
    caption: "Daylight Run",
    spec: "473 hp · Sedan",
    tag: "M Series",
    span: "normal",
    src: "https://images.unsplash.com/photo-1612545667889-b061512d0dfa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m4-twilight",
    model: "M4 Competition",
    caption: "Twilight Chase",
    spec: "503 hp · xDrive",
    tag: "Night Shots",
    span: "normal",
    src: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "4series-night",
    model: "4 Series Coupé",
    caption: "Night Park",
    spec: "374 hp · Coupé",
    tag: "Night Shots",
    span: "wide",
    src: "https://images.unsplash.com/photo-1570356528233-b442cf2de345?auto=format&fit=crop&w=1200&q=80",
  },
  {
   id: "m2-highway",
    model: "M2 Coupé",
    caption: "Highway Blue",
    spec: "460 hp · Manual",
    tag: "Coupé",
    span: "tall",
    src: "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&w=1200&q=80", 
  },
  {
    id: "m3-cs-track",
    model: "M3 CS",
    caption: "Track Day",
    spec: "543 hp · Carbon",
    tag: "M Series",
    span: "normal",
    src: "https://images.unsplash.com/photo-1593517758061-e04bd0fee3aa?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "BMW M5 DarkShadow",
    model: "M5 CS",
    caption: "Dark-wolf",
    spec: "543 hp · Carbon",
    tag: "M Series",
    span: "wide",
    src: blackbmwg,
  }
  
];

const FILTERS = ["All", "M Series", "Coupé", "Night Shots"];

function StripeMark({ className = "" }) {
  return (
    <span className={`stripe-mark ${className}`} aria-hidden="true">
      <i className="stripe-blue" />
      <i className="stripe-violet" />
      <i className="stripe-red" />
    </span>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryRef = useRef(null);

  const visibleCars =
    activeFilter === "All"
      ? CARS
      : CARS.filter((car) => car.tag === activeFilter);

  const openLightbox = (car) => {
    const idx = visibleCars.findIndex((c) => c.id === car.id);
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % visibleCars.length));
  }, [visibleCars.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + visibleCars.length) % visibleCars.length
    );
  }, [visibleCars.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activeCar = lightboxIndex !== null ? visibleCars[lightboxIndex] : null;

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bmw-gallery">
      {/* ---------- HERO ---------- */}
      <header className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-scrim" />
        <div className="hero-top">
          <span className="wordmark">BMW</span>
          <StripeMark />
        </div>

        <div className="hero-body">
          <h1 className="hero-title">
            <span>Precision,</span>
            <span>unleashed.</span>
          </h1>
          <p className="hero-sub">
            A curated collection of the machines that define the M badge —
            every line, every exhaust note, every apex.
          </p>
          <button className="hero-cta" onClick={scrollToGallery}>
            Enter the gallery
          </button>
        </div>

        <div className="hero-bottom">
          <span>{CARS.length} vehicles</span>
          <span className="hero-bottom-divider" />
          <span>4 categories</span>
        </div>
      </header>

      {/* ---------- FILTER BAR ---------- */}
      <nav className="filter-bar" ref={galleryRef}>
        <div className="filter-bar-inner">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "is-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="filter-count">
          {visibleCars.length.toString().padStart(2, "0")} shown
        </span>
      </nav>

      {/* ---------- GALLERY GRID ---------- */}
      <main className="gallery-grid">
        {visibleCars.map((car) => (
          <button
            key={car.id}
            className={`gallery-card span-${car.span}`}
            onClick={() => openLightbox(car)}
            aria-label={`Open ${car.model} — ${car.caption}`}
          >
            <img src={car.src} alt={`${car.model}, ${car.caption}`} loading="lazy" />
            <div className="card-info">
              <div className="card-info-text">
                <p className="card-model">{car.model}</p>
                <p className="card-caption">{car.caption}</p>
              </div>
              <p className="card-spec">{car.spec}</p>
            </div>
          </button>
        ))}
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="gallery-footer">
        <StripeMark className="footer-stripe" />
        <p>BMW Gallery — built for the drive.</p>
      </footer>

      {/* ---------- LIGHTBOX ---------- */}
      {activeCar && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCar.model} viewer`}
          onClick={closeLightbox}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ×
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeCar.src} alt={`${activeCar.model}, ${activeCar.caption}`} />
            <div className="lightbox-caption">
              <div>
                <p className="lightbox-model">{activeCar.model}</p>
                <p className="lightbox-sub">
                  {activeCar.caption} · {activeCar.spec}
                </p>
              </div>
              <p className="lightbox-count">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(visibleCars.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
          >
          </button>
        </div>
      )}

      <footer className="footerS">
          <div className="copyright">
            © 2026 BMW. All rights reserved by Sujal Verma. Designed and developed by Sujal Verma.
          </div>

      </footer>
    </div>
  );
}
