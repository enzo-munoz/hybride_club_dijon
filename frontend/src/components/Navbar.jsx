import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    const NavLink = ({ href, children }) => {
        const isHome = location.pathname === '/';
        const sectionId = href.replace('#', '');
        
        if (isHome) {
            return (
                <a 
                    href={href} 
                    className="hover:text-primary transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(sectionId);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    {children}
                </a>
            );
        } else {
            return (
                <Link 
                    to={`/${href}`} 
                    className="hover:text-primary transition-colors"
                >
                    {children}
                </Link>
            );
        }
    };

    return (
        <header className="bg-secondary p-4 sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-primary tracking-widest">
                    <Link to="/">HYBRIDE CLUB</Link>
                </div>
                <ul className="flex gap-6 items-center">
                    <li><NavLink href="#presentation">Le Club</NavLink></li>
                    <li><NavLink href="#coaches">Coachs</NavLink></li>
                    <li><NavLink href="#evenements">Événements</NavLink></li>
                    <li><NavLink href="#contact">Contact</NavLink></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/membres" className="hover:text-primary transition-colors">Espace Membre</Link></li>
                            <li>
                                <button onClick={logout} className="bg-primary px-4 py-2 rounded text-white hover:bg-orange-600 transition-colors">
                                    Déconnexion
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="bg-primary px-4 py-2 rounded text-white hover:bg-orange-600 transition-colors">
                                Connexion Membre
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
