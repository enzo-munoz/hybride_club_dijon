import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Section = ({ title, children }) => (
    <div className="bg-secondary rounded-lg p-6 my-5 border-l-4 border-yellow-400">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">{title}</h2>
        {children}
    </div>
);

const Highlight = ({ children }) => (
    <div className="bg-background p-4 border-l-4 border-yellow-400 my-4 rounded">
        {children}
    </div>
);

const ContactBox = ({ children }) => (
    <div className="bg-background p-4 border-l-4 border-yellow-400 rounded my-3">
        {children}
    </div>
);

const Li = ({ children }) => (
    <li className="text-gray-300 my-2">{children}</li>
);

const H3 = ({ children }) => (
    <h3 className="text-yellow-400 font-semibold mt-5 mb-2">{children}</h3>
);

const PolitiqueConfidentialite = () => {
    return (
        <div className="min-h-screen bg-background text-text flex flex-col">
            <Navbar />
            <main className="flex-1 py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-yellow-400 border-b-4 border-yellow-400 pb-3 mb-2">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-gray-500 text-sm mb-6">Hybride Club Dijon • Dernière mise à jour : juin 2026</p>

                    <Section title="1. Responsable de Traitement">
                        <p className="text-gray-300 font-bold mb-1">Hybride Club Dijon</p>
                        <p className="text-gray-300 mb-4">Exploitant la salle d'Hyrox basée à Longvic, France.</p>
                        <ContactBox>
                            <p className="text-white font-semibold mb-1">Contact Coachs / Support :</p>
                            <p className="text-gray-300">Benjamin REZZONICO • Valentin MUNOZ</p>
                            <p className="text-gray-300">Vous pouvez les contacter via l'application pour toute question sur vos données.</p>
                        </ContactBox>
                    </Section>

                    <Section title="2. Données Collectées">
                        <H3>2.1 Données d'Identification & Profil</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Nom, Prénom, Email, Date d'anniversaire</strong> — collectés lors de l'inscription</Li>
                            <Li><strong>Pseudo</strong> — généré automatiquement (Prénom + 3 lettres du nom) • <strong>visible par les coachs uniquement</strong></Li>
                            <Li><strong>Données physiques</strong> — taille, poids, taille de T-shirt (volontaires, soumises à permission de partage avec les coachs uniquement)</Li>
                        </ul>
                        <H3>2.2 Données de Paiement</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Numéro de carte bancaire</strong> — traitées uniquement par Stripe (PCI-DSS compliant)</Li>
                            <Li><strong>Historique transactions</strong> — montants, dates, type d'achat (crédits, abonnements)</Li>
                            <Li><strong>Statut paiement</strong> — confirmé, en attente, échoué</Li>
                        </ul>
                        <Highlight>
                            <p className="text-gray-300"><strong className="text-white">⚠️ Important :</strong> Hybride Club Dijon ne stocke jamais vos données bancaires complètes. Elles sont traitées de manière sécurisée par Stripe, notre prestataire de paiement certifié.</p>
                        </Highlight>
                        <H3>2.3 Données de Réservation & Crédits</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Réservations</strong> — séances réservées, dates, heures, statut (confirmé, annulé)</Li>
                            <Li><strong>Crédits</strong> — solde, type d'abonnement, date d'expiration</Li>
                            <Li><strong>Cartes partagées</strong> — identité de l'autre utilisateur partageant les crédits</Li>
                        </ul>
                        <H3>2.4 Données de Performance & Statistiques</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Temps Hyrox</strong> — saisie volontaire de vos temps par atelier (Skierg, Sled Push, etc.)</Li>
                            <Li><strong>Temps de running</strong> — 200m, 400m, 5km, 10km (volontaires)</Li>
                            <Li><strong>Historique séances</strong> — nombre de séances réalisées, durée cumulée, dates</Li>
                            <Li><strong>Permission de partage</strong> — accord ou refus de partager ces données avec les coachs</Li>
                        </ul>
                        <H3>2.5 Données de Messagerie & Support</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Messages</strong> — contenu de vos messages au support coachs uniquement</Li>
                            <Li><strong>Auto-suppression</strong> — tous les messages sont automatiquement supprimés après 7 jours</Li>
                        </ul>
                        <H3>2.6 Données de Notification</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Identifiants de notification</strong> — token FCM pour recevoir les notifications push</Li>
                        </ul>
                    </Section>

                    <Section title="3. Base Juridique du Traitement">
                        <ul className="list-disc pl-5">
                            <Li><strong>Consentement explicite</strong> — vous acceptez cette politique et les CGU lors de l'inscription</Li>
                            <Li><strong>Contrat</strong> — traitement nécessaire pour l'exécution de votre abonnement/réservation</Li>
                            <Li><strong>Obligation légale</strong> — conservation de factures pour la comptabilité (durée légale)</Li>
                            <Li><strong>Intérêt légitime</strong> — amélioration des services, prévention des fraudes</Li>
                        </ul>
                    </Section>

                    <Section title="4. Utilisation de Vos Données">
                        <H3>Vos données sont utilisées pour :</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Gestion de votre compte</strong> — authentification, profil, réservations</Li>
                            <Li><strong>Gestion des crédits & paiements</strong> — via Stripe (prestataire de paiement)</Li>
                            <Li><strong>Notifications</strong> — rappels avant séances (24h, 3h), confirmations d'achat, alertes importantes</Li>
                            <Li><strong>Suivi de performance</strong> — affichage de vos stats personnelles</Li>
                            <Li><strong>Support client</strong> — réponses à vos messages via les coachs</Li>
                            <Li><strong>Analyse de remplissage des séances</strong> — pour les coachs uniquement (réservations/profils des inscrits, sans lien avec la permission de partage des stats)</Li>
                        </ul>
                        <H3>Vos données ne sont PAS utilisées pour :</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Marketing ciblé/réseaux sociaux</strong> — pas de partage avec Meta, Google, etc.</Li>
                            <Li><strong>Revente</strong> — vos données ne sont jamais vendues</Li>
                            <Li><strong>Profilage commercial</strong></Li>
                        </ul>
                    </Section>

                    <Section title="5. Partage des Données">
                        <H3>5.1 Prestataires de Confiance (Sous-traitants)</H3>
                        <p className="text-gray-300 mb-2">Hybride Club Dijon confie vos données à ces services sécurisés uniquement :</p>
                        <ul className="list-disc pl-5">
                            <Li><strong>Supabase</strong> (hébergement cloud) — base de données et authentification</Li>
                            <Li><strong>Stripe</strong> (paiements) — traitement bancaire sécurisé (PCI-DSS)</Li>
                            <Li><strong>Firebase Cloud Messaging (FCM)</strong> (notifications) — envoi des push</Li>
                            <Li><strong>Resend</strong> (emails transactionnels) — confirmations et reçus</Li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-2 italic">Tous ces prestataires sont situés dans l'UE ou respectent le Data Privacy Framework.</p>
                        <H3>5.2 Partage avec les Coachs</H3>
                        <ul className="list-disc pl-5">
                            <Li>
                                Benjamin REZZONICO et Valentin MUNOZ (admins Hybride Club) voient :
                                <ul className="list-disc pl-5 mt-1">
                                    <Li>Nom, Prénom, Pseudo, Email, statut abonnement</Li>
                                    <Li>Réservations et crédits restants</Li>
                                    <Li><strong>Votre permission de partage décide</strong> s'ils voient vos données physiques (taille, poids, T-shirt), temps Hyrox et statistiques de performance</Li>
                                </ul>
                            </Li>
                        </ul>
                        <H3>5.3 Autres Cas</H3>
                        <ul className="list-disc pl-5">
                            <Li><strong>Obligations légales</strong> — partage avec autorités si ordonnance judiciaire (gendarmerie, impôts, etc.)</Li>
                            <Li><strong>Fusions/acquisitions</strong> — en cas de reprise du club, vos données pourraient être transférées (avis préalable)</Li>
                        </ul>
                    </Section>

                    <Section title="6. Sécurité des Données">
                        <Highlight>
                            <p className="text-white font-semibold">Vos données sont protégées par :</p>
                        </Highlight>
                        <ul className="list-disc pl-5">
                            <Li><strong>HTTPS/TLS</strong> — chiffrement lors de la transmission (en transit)</Li>
                            <Li><strong>Chiffrement en base</strong> — stockage sécurisé chez Supabase (PostgreSQL chiffré)</Li>
                            <Li><strong>Authentification forte</strong> — OAuth (Google/Apple) ou mots de passe hashés (bcrypt)</Li>
                            <Li><strong>Gestion d'accès (RLS)</strong> — les coachs ne voient que les données autorisées, clients ne voient que leurs données</Li>
                            <Li><strong>Audit des logs</strong> — accès aux données sensibles sont tracés</Li>
                            <Li><strong>Suppression sécurisée</strong> — données supprimées dans les 72 heures après demande avec confirmation</Li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-3 italic">Contrairement à ce que vous pourriez penser, vos données bancaires NE transitent jamais par nos serveurs — Stripe gère cela directement.</p>
                    </Section>

                    <Section title="7. Conservation des Données">
                        <ul className="list-disc pl-5">
                            <Li><strong>Données de compte actif</strong> — conservées tant que votre compte existe</Li>
                            <Li><strong>Historique transactions</strong> — minimum 6 ans (obligation légale comptable en France)</Li>
                            <Li><strong>Messages</strong> — supprimés automatiquement après 7 jours</Li>
                            <Li><strong>Logs d'accès</strong> — conservés 30 jours pour la sécurité</Li>
                            <Li><strong>Après suppression du compte</strong> — données supprimées dans les 72 heures, sauf historique transactions (6 ans, obligation légale)</Li>
                        </ul>
                    </Section>

                    <Section title="8. Vos Droits RGPD">
                        <p className="text-gray-300 mb-3">Vous disposez des droits suivants (Règlement Général sur la Protection des Données) :</p>
                        <ul className="list-disc pl-5">
                            <Li><strong>Droit d'accès</strong> — demander une copie de vos données</Li>
                            <Li><strong>Droit de rectification</strong> — corriger des informations inexactes</Li>
                            <Li><strong>Droit à l'oubli</strong> — demander la suppression de votre compte et vos données</Li>
                            <Li><strong>Droit à la portabilité</strong> — récupérer vos données dans un format standard</Li>
                            <Li><strong>Droit à la limitation</strong> — demander à suspendre le traitement</Li>
                            <Li><strong>Droit d'opposition</strong> — refuser certains traitements</Li>
                            <Li><strong>Droit de retirer le consentement</strong> — à tout moment (non-rétroactif)</Li>
                        </ul>
                        <p className="text-gray-300 mt-3">Pour exercer ces droits, contactez les coachs directement via l'application ou par email.</p>
                    </Section>

                    <Section title="9. Suppression de Compte">
                        <p className="text-white font-semibold mb-2">Vous pouvez demander la suppression de votre compte :</p>
                        <ul className="list-disc pl-5">
                            <Li>Depuis l'app → Profil → "Supprimer mon compte"</Li>
                            <Li>Ou par email : <a href="mailto:contact@hybrideclubdijon.fr" className="text-yellow-400 hover:underline">contact@hybrideclubdijon.fr</a></Li>
                        </ul>
                        <p className="text-white font-semibold mt-4 mb-2">Conséquences :</p>
                        <ul className="list-disc pl-5">
                            <Li>Votre compte sera désactivé immédiatement</Li>
                            <Li>Vos données personnelles seront supprimées sous 72h</Li>
                            <Li>Vos transactions seront anonymisées (conservation légale 6 ans)</Li>
                            <Li>Vous ne recevrez plus aucune notification</Li>
                        </ul>
                    </Section>

                    <Section title="10. Cookies & Identifiants de Suivi">
                        <p className="text-gray-300 mb-3">L'application mobile Hybride Club ne stocke pas de cookies (technologie web). Cependant :</p>
                        <ul className="list-disc pl-5">
                            <Li><strong>Session token</strong> — stocké localement pour vous maintenir connecté (peut être supprimé via logout)</Li>
                            <Li><strong>FCM token</strong> — utilisé uniquement pour les notifications push (aucun suivi analytique)</Li>
                            <Li><strong>Pas d'Analytics</strong> — nous ne trackons pas vos actions dans l'app (pas de Google Analytics, Mixpanel, etc.)</Li>
                        </ul>
                    </Section>

                    <Section title="11. Données Sensibles & Vérification Étudiant">
                        <H3>Tarifs Étudiant</H3>
                        <p className="text-gray-300 mb-3">Si vous souscrivez au tarif étudiant, vous déclarez être étudiant(e). <strong>Les coachs vérifieront votre statut après souscription</strong> (carte étudiant). Aucun justificatif n'est conservé, seule une validation est enregistrée dans l'application.</p>
                        <H3>Données de Santé</H3>
                        <p className="text-gray-300">L'app ne collecte pas de données de santé stricto sensu. Les données de taille/poids/blessures sont <strong>purement volontaires</strong> et utilisées uniquement pour votre suivi personnel.</p>
                    </Section>

                    <Section title="12. Contact & Plaintes">
                        <p className="text-white font-semibold mb-1">Pour des questions sur cette politique :</p>
                        <p className="text-gray-300 mb-4">Contactez Benjamin ou Valentin via l'app → Support</p>
                        <p className="text-white font-semibold mb-1">Pour une plainte RGPD :</p>
                        <p className="text-gray-300 mb-2">Vous avez le droit de déposer plainte auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :</p>
                        <ul className="list-disc pl-5">
                            <Li><strong>CNIL</strong> — 3 Place de Fontenoy, 75007 Paris</Li>
                            <Li><a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">www.cnil.fr</a></Li>
                        </ul>
                    </Section>

                    <Section title="13. Modifications de cette Politique">
                        <p className="text-gray-300 mb-3">Hybride Club Dijon peut mettre à jour cette politique de confidentialité. Les modifications seront notifiées via l'app ou par email. Votre utilisation continue vaut acceptation.</p>
                        <p className="text-gray-400 text-sm italic">Dernière mise à jour : juin 2026</p>
                    </Section>

                    <div className="text-center text-gray-600 text-xs mt-8 pt-6 border-t border-gray-800">
                        <p>Application développée par <a href="https://maat-ia.fr" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">maat-ia.fr</a><br />Hybride Club Dijon © 2026</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PolitiqueConfidentialite;
