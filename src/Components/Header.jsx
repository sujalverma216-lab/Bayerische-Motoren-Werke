import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import BMW from '../assets/BMW.png'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header${menuOpen ? ' is-open' : ''}`}>
      <button
        className="site-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav id="site-navigation" aria-label="Main navigation">
        <ul>
          <li className="logo-item">
            <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
              <img src={BMW} alt="BMW Logo" />
            </Link>
          </li>
          <li><Link to="/categories" onClick={() => setMenuOpen(false)}>CATEGORIES</Link></li>
          <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>GALLERY</Link></li>
          <li><Link to="/enquiry" onClick={() => setMenuOpen(false)}>ENQUIRY</Link></li>
          <li><Link to="/bookride" onClick={() => setMenuOpen(false)}>BOOK A TEST RIDE</Link></li>
        </ul>
      </nav>
    </header>
  )
}
 
