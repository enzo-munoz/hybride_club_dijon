import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CONTACT_EMAIL = 'contact@hybrideclubdijon.fr';
const INSTAGRAM_URL = 'https://www.instagram.com/hybride.club.dijon';

const coaches = [
    { prenom: 'Benjamin', nom: 'Rezzonico', bio: '' },
    { prenom: 'Valentin', nom: 'Munoz', bio: '' },
];

// Ajouter ici les prochaines compétitions : { date: 'AAAA-MM-JJ', titre, description, lieu }
const evenements = [];

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location]);

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
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl text-primary font-bold mb-12 text-center uppercase">Nos Coachs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {coaches.map(coach => (
                                <div key={coach.nom} className="bg-secondary p-6 rounded-lg text-center">
                                    <h3 className="text-xl font-bold mb-2">{coach.prenom} {coach.nom}</h3>
                                    {coach.bio && <p className="text-gray-300 text-sm">{coach.bio}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Evenements Section */}
                <section id="evenements" className="py-16 px-4 bg-background">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl text-primary font-bold mb-12 text-center uppercase">Prochaines Compétitions</h2>
                        <div className="space-y-6">
                            {evenements.length > 0 ? evenements.map(event => (
                                <div key={event.titre} className="bg-secondary p-6 rounded-lg flex flex-col md:flex-row justify-between items-center hover:bg-gray-800 transition-colors">
                                    <div className="mb-4 md:mb-0 text-center md:text-left">
                                        <span className="block text-primary font-bold text-lg mb-1">
                                            {new Date(event.date).toLocaleDateString('fr-FR')}
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
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 px-4 bg-secondary/30">
                    <div className="container mx-auto max-w-xl text-center">
                        <h2 className="text-4xl text-primary font-bold mb-12 uppercase">Contactez-nous</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href={`mailto:${CONTACT_EMAIL}`} className="bg-primary text-white font-bold py-3 px-6 rounded hover:bg-orange-600 transition-colors">
                                Nous écrire
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="border border-primary text-white font-bold py-3 px-6 rounded hover:bg-primary transition-colors">
                                Instagram
                            </a>
                        </div>
                        <p className="text-gray-400 mt-6">{CONTACT_EMAIL}</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
