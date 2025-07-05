import { Link, useLocation } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    <FaVideo /> Creatorverse
                </Link>
                <div className="navbar-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}>Add Creator</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 