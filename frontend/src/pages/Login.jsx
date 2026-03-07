import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/membres');
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur de connexion');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="p-4">
                <Link to="/" className="text-primary font-bold text-xl tracking-widest">HYBRIDE CLUB</Link>
            </header>
            
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center uppercase">Espace Membre</h1>
                    
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-1">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-1">Mot de passe</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                                required 
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors mt-2">
                            Se connecter
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Pas encore membre ? <Link to="/#contact" className="text-primary hover:underline">Contactez-nous</Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;
