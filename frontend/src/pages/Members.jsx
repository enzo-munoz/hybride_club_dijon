import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SessionCard from '../components/SessionCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Members = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await api.get('/sessions/semaine');
                setSessions(response.data);
            } catch (error) {
                console.error("Error fetching sessions", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchSessions();
        }
    }, [isAuthenticated]);

    const handleVote = async (sessionId, presence) => {
        try {
            await api.post(`/sessions/${sessionId}/vote`, { presence });
            const response = await api.get('/sessions/semaine');
            setSessions(response.data);
        } catch (error) {
            alert("Erreur lors du vote : " + (error.response?.data?.detail || error.message));
        }
    };

    const handleGenerateSchedule = async () => {
        if (!window.confirm("Voulez-vous générer le planning pour la semaine prochaine ?")) return;

        try {
            const response = await api.post('/sessions/generate');
            alert(response.data.message);
            const sessionsRes = await api.get('/sessions/semaine');
            setSessions(sessionsRes.data);
        } catch (error) {
            console.error("Error generating schedule", error);
            alert("Erreur lors de la génération du planning");
        }
    };

    if (authLoading || !isAuthenticated) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                    <h1 className="text-3xl font-bold uppercase">Espace Membre</h1>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Bonjour,</p>
                        <p className="text-xl font-bold text-primary">{user?.prenom} {user?.nom}</p>
                    </div>
                </div>

                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Semaine d'entraînement</h2>
                        <p className="text-gray-400">Confirmez votre présence avant la deadline (Veille 23h59)</p>
                    </div>
                    {user?.role === 'coach' && (
                        <button
                            onClick={handleGenerateSchedule}
                            className="bg-secondary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-600 transition-colors"
                        >
                            Générer Planning
                        </button>
                    )}
                </div>

                {loading ? (
                    <p className="text-center">Chargement des séances...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.length > 0 ? (
                            sessions.map(session => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    onVote={handleVote}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-400 py-12 bg-secondary rounded-lg">
                                Aucune séance programmée pour cette semaine.
                            </p>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Members;
