import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary p-6 text-center mt-auto">
            <p className="text-gray-400 mb-3">&copy; {new Date().getFullYear()} Hybride Club. Tous droits réservés.</p>
            <div className="flex justify-center gap-6 text-sm">
                <Link to="/politique-confidentialite" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    Politique de confidentialité
                </Link>
                <Link to="/suppression-compte" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    Suppression de compte
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
