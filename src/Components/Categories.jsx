import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
// Import your category images here

import suvImg from "../assets/bmwsuv.jpeg";
import electricImg from "../assets/bmwelectric.jpeg";
import mImg from "../assets/bmwcoupe.jpeg";
import SedanGranBmw from "../assets/sedangranbmw.png";
import convertibleBmw from "../assets/convertiblebmw.png";

const categoriesData = [
  {
    title: "SEDANS / GRAN COUPES",
    description: "The classic blend of executive luxury, comfort, and everyday athletic performance engineered for executive journeys.",
    path: "/SedansGC",
    image: SedanGranBmw,
  },
  {
    title: "COUPES / CONVERTIBLES",
    description: "Striking design, low-slung proportions, and open-air thrills built for dynamic driving dynamics.",
    path: "/CoupesC",
    image: convertibleBmw,
  },
  {
    title: "X MODELS (SAVs/SUVs)",
    description: "Unmatched versatility, command seating, and intelligent all-wheel drive ready for any terrain.",
    path: "/XModels",
    image: suvImg,
  },
  {
    title: "BMW i (ELECTRIC)",
    description: "Zero emissions, futuristic innovation, and silent electric power redefining sustainable mobility.",
    path: "/BMWElectric",
    image: electricImg,
  },
  {
    title: "BMW M (HIGH PERFORMANCE)",
    description: "Track-bred engineering and raw adrenaline built for absolute performance on the road.",
    path: "/BMWM",
    image: mImg,
  },
];

export function Categories() {
  return (
    <div className="categories-page">
      <div className="categories-header">
        <p className="eyebrow">EXPLORE LINEUP</p>
        <h1>CHOOSE YOUR BMW CATEGORY</h1>
      </div>

      <div className="categories-list">
        {categoriesData.map((cat, index) => {
          // If index is odd, reverse-layout class is applied
          const isReversed = index % 2 !== 0;

          return (
            <div 
              className={`category-box ${isReversed ? "reversed" : ""}`} 
              key={index}
            >
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.title} />
              </div>

              <div className="category-details">
                <span className="cat-number">0{index + 1}</span>
                <h2>{cat.title}</h2>
                <p className="cat-desc">{cat.description}</p>
                <Link to={cat.path} className="more-options-btn">
                  More Options <span>↗</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="footerC">
        <div className="copyrightC">
          © 2026 BMW. All rights reserved by Sujal Verma. Designed and developed by Sujal Verma.
        </div>

      </footer>

    </div>
    
  );
}

export default Categories;
