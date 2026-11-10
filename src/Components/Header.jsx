import { Link } from 'react-router-dom'
import './Header.css'
import BMW from '../assets/BMW.png'

export function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation">
        <ul>
          <li className="logo-item">
            <Link to="/" className="logo">
              <img src={BMW} alt="BMW Logo" />
            </Link>
          </li>
          <li><Link to="/categories">CATEGORIES</Link></li>
          <li><Link to="/gallery">GALLERY</Link></li>
          <li><Link to="/enquiry">ENQUIRY</Link></li>
          <li><Link to="/bookride">BOOK A TEST RIDE</Link></li>
        </ul>
      </nav>
    </header>
  )
}
 
