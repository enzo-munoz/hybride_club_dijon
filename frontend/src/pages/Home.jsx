import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoachCard from '../components/CoachCard';

const Home = () => {
    const [coaches, setCoaches] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contactForm, setContactForm] = useState({ nom: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState({ loading: false, error: null, success: false });
    const location = useLocation();

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactStatus({ loading: true, error: null, success: false });
        try {
            await api.post('/contact', contactForm);
            setContactStatus({ loading: false, error: null, success: true });
            setContactForm({ nom: '', email: '', message: '' });
            setTimeout(() => setContactStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (error) {
            setContactStatus({ loading: false, error: "Une erreur est survenue lors de l'envoi du message.", success: false });
        }
    };

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coachesRes, eventsRes] = await Promise.all([
                    api.get('/coaches'),
                    api.get('/evenements'),
                ]);
                setCoaches(coachesRes.data);
                setEvents(eventsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section id="hero" className="h-[80vh] flex items-center justify-center text-center bg-cover bg-center relative" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
                    <div className="max-w-4xl px-4">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight">HYBRIDE CLUB</h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">Repoussez vos limites. Devenez Hybride.</p>
                        <a href="#contact" className="inline-block bg-primary text-white font-bold py-4 px-8 rounded hover:bg-orange-600 transition-transform hover:scale-105">
                            Rejoindre le club
                        </a>
                    </div>
                </section>

                {/* Presentation Section */}
                <section id="presentation" className="py-16 px-4 bg-background">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl text-primary font-bold mb-8 uppercase">L'Esprit Hybride</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Le Hybride Club est dédié à la préparation physique complète, mêlant force, endurance et agilité. 
                            Spécialisés dans la discipline Hyrox, nous vous accompagnons vers vos objectifs de performance 
                            dans une ambiance de dépassement de soi et de camaraderie.
                        </p>
                    </div>
                </section>

                {/* Coaches Section */}
                <section id="coaches" className="py-16 px-4 bg-secondary/30">
                    <div className="container mx-auto">
                        <h2 className="text-4xl text-primary font-bold mb-12 text-center uppercase">Nos Coachs</h2>
                        {loading ? (
                            <p className="text-center">Chargement...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {coaches.map(coach => (
                                    <CoachCard key={coach.id} coach={coach} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Evenements Section */}
                <section id="evenements" className="py-16 px-4 bg-background">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl text-primary font-bold mb-12 text-center uppercase">Prochaines Compétitions</h2>
                        {loading ? (
                            <p className="text-center">Chargement...</p>
                        ) : (
                            <div className="space-y-6">
                                {events.length > 0 ? events.map(event => (
                                    <div key={event.id} className="bg-secondary p-6 rounded-lg flex flex-col md:flex-row justify-between items-center hover:bg-gray-800 transition-colors">
                                        <div className="mb-4 md:mb-0 text-center md:text-left">
                                            <span className="block text-primary font-bold text-lg mb-1">
                                                {new Date(event.date).toLocaleDateString()}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white">{event.titre}</h3>
                                            <p className="text-gray-400 mt-1">{event.description}</p>
                                        </div>
                                        <span className="bg-gray-700 px-4 py-2 rounded text-sm text-gray-300">
                                            {event.lieu}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-center text-gray-400">Aucun événement prévu pour le moment.</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 px-4 bg-secondary/30">
                    <div className="container mx-auto max-w-xl">
                        <h2 className="text-4xl text-primary font-bold mb-12 text-center uppercase">Contactez-nous</h2>
                        
                        <div className="flex justify-center gap-8 mb-8">
                            <a href="#" className="text-white hover:text-primary text-xl flex items-center gap-2">
                                <span className="font-bold">Instagram</span>
                            </a>
                            <a href="#" className="text-white hover:text-primary text-xl flex items-center gap-2">
                                <span className="font-bold">Facebook</span>
                            </a>
                        </div>

                        <form className="space-y-4" onSubmit={handleContactSubmit}>
                            <input 
                                type="text" 
                                name="nom"
                                value={contactForm.nom} 
                                onChange={handleContactChange}
                                placeholder="Nom" 
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary" 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactChange}
                                placeholder="Email" 
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary" 
                                required 
                            />
                            <textarea 
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                                placeholder="Message" 
                                rows="4" 
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary" 
                                required
                            ></textarea>
                            
                            {contactStatus.error && (
                                <div className="text-red-500 text-center bg-red-500/10 p-2 rounded border border-red-500/50">
                                    {contactStatus.error}
                                </div>
                            )}
                            
                            {contactStatus.success && (
                                <div className="text-green-500 text-center bg-green-500/10 p-2 rounded border border-green-500/50">
                                    Message envoyé avec succès !
                                </div>
                            )}
                            
                            <button 
                                type="submit" 
                                disabled={contactStatus.loading}
                                className={`w-full bg-primary text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors ${contactStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {contactStatus.loading ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
