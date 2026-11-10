import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SedansGC.css';

const sedansAndGranCoupes = [
  {
    id: 1,
    name: '1 Series Sedan',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Compact luxury sedan offering dynamic handling and efficient city performance.'
  },
  {
    id: 3,
    name: '3 Series',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'The benchmark of luxury sport sedans, combining iconic dynamics and refined comfort.'
  },
  {
    id: 4,
    name: '4 Series Gran Coupe',
    category: 'Gran Coupe',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'A striking four-door coupe merging athletic performance with fastback styling.'
  },
  {
    id: 5,
    name: '5 Series',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Executive mid-size sedan delivering innovation, long-distance comfort, and power.'
  },
  {
    id: 6,
    name: '6 Series Gran Coupe',
    category: 'Gran Coupe',
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Luxurious four-door gran coupe defined by timeless grand touring proportions.'
  },
  {
    id: 7,
    name: '7 Series',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1541348263662-e052662afda3?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'The flagship luxury sedan representing supreme comfort and futuristic technology.'
  },
];

export default function SedansGC() {
  const navigate = useNavigate();

  const handleKnowMore = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="sedans-gc-container">
      <header className="sedans-gc-header">
        <h1>Sedans & Gran Coupes</h1>
        <p>Explore the exclusive lineup of BMW performance sedans and gran coupes.</p>
      </header>

      <div className="cars-grid">
        {sedansAndGranCoupes.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-wrapper">
              <span className="car-badge">{car.id} Series</span>
              <img src={car.image} alt={car.name} className="car-image" />
            </div>
            
            <div className="car-content">
              <span className="car-category">{car.category}</span>
              <h2>{car.name}</h2>
              <p>{car.shortDesc}</p>
              
              <button 
                className="know-more-btn" 
                onClick={() => handleKnowMore(car.id)}
              >
                Know More
              </button>

            <footer className="footerC">
        <div className="copyrightC">
          © 2026 BMW. All rights reserved by Sujal Verma. Designed and developed by Sujal Verma.
        </div>

      </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}