import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
    "Ouvrez l'application Hybride Club Dijon",
    <>Accédez à votre <strong>Profil</strong></>,
    <>Faites défiler jusqu'à <strong>Supprimer mon compte</strong></>,
    "Confirmez la suppression"
];

const deletedData = [
    "Nom, prénom, pseudo, email",
    "Date d'anniversaire",
    "Statistiques et performances (temps Hyrox, poids, taille)",
    "Historique des réservations",
    "Crédits restants",
    "Messages de support",
    "Préférences et paramètres"
];

const keptData = [
    <>Historique des transactions et factures — <strong>10 ans</strong> (Code de commerce, art. L123-22)</>,
    "Données de facturation Stripe — conservées par Stripe selon ses obligations légales"
];

const SuppressionCompte = () => {
    return (
        <div className="min-h-screen bg-background text-text flex flex-col">
            <Navbar />
            <main className="flex-1 py-10 px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-1">Suppression de compte</h1>
                    <p className="text-yellow-400 text-sm font-semibold mb-8">Hybride Club Dijon</p>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous pouvez demander la suppression de votre compte et de vos données personnelles à tout moment.
                    </p>

                    <h2 className="text-lg font-semibold text-white mt-8 mb-4">Procédure de suppression</h2>
                    <div className="bg-secondary rounded-xl p-6 mb-4 border border-gray-800">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-4 py-2">
                                <div className="bg-yellow-400 text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="pt-0.5 text-gray-300">{step}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        Votre compte sera supprimé sous <strong className="text-white">72 heures</strong> après confirmation. Vous recevrez un email de confirmation.
                    </p>

                    <h2 className="text-lg font-semibold text-white mt-8 mb-4">Données supprimées</h2>
                    <ul className="space-y-2 mb-6">
                        {deletedData.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                                <span className="text-yellow-400 font-bold mt-0.5 flex-shrink-0">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-lg font-semibold text-white mt-8 mb-4">Données conservées (obligation légale)</h2>
                    <p className="text-gray-300 mb-3">Certaines données sont conservées conformément aux obligations légales françaises :</p>
                    <ul className="space-y-2 mb-4">
                        {keptData.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                                <span className="text-yellow-400 font-bold mt-0.5 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-300 mb-6">
                        Ces données sont anonymisées et ne sont plus associées à votre identité dans l'application.
                    </p>

                    <div className="rounded-xl p-5 my-6 border border-yellow-800" style={{ background: '#1c1207' }}>
                        <div className="text-yellow-400 font-semibold mb-2">⚠ Attention</div>
                        <p className="text-gray-300">
                            La suppression de votre compte est <strong className="text-white">définitive et irréversible</strong>. Vos crédits restants et abonnements en cours seront perdus sans remboursement.
                        </p>
                    </div>

                    <h2 className="text-lg font-semibold text-white mt-8 mb-4">Contact</h2>
                    <div className="bg-secondary rounded-xl p-6 border border-gray-800">
                        <p className="text-gray-300 mb-3">
                            Si vous ne pouvez pas accéder à l'application, vous pouvez demander la suppression de votre compte par email :
                        </p>
                        <p className="mb-3">
                            <a href="mailto:contact@hybrideclubdijon.fr" className="text-yellow-400 hover:underline">
                                contact@hybrideclubdijon.fr
                            </a>
                        </p>
                        <p className="text-gray-300">
                            Merci de préciser le nom et l'adresse email associés à votre compte. Votre demande sera traitée et vous sera confirmée sous 72 heures.
                        </p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
                        <p>
                            Hybride Club Dijon — Application réalisée par{' '}
                            <a href="https://maat-ia.fr" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">
                                maat-ia.fr
                            </a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SuppressionCompte;
