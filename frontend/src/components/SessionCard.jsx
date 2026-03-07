import clsx from 'clsx';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SessionCard = ({ session, onVote }) => {
    const deadline = new Date(session.deadline_vote);
    const sessionDate = new Date(session.date);
    const endDate = new Date(session.heure_fin);
    const now = new Date();
    const isLocked = now > deadline;
    
    const myVote = session.user_vote ? (session.user_vote.presence ? 'present' : 'absent') : null;
    const presentCount = (session.reponses || []).filter(r => r.presence).length;
    const presentList = (session.reponses || []).filter(r => r.presence).map(r => r.prenom).join(', ');

    return (
        <div className={clsx(
            "bg-secondary border border-gray-700 rounded-lg p-6 relative",
            isLocked && "opacity-75 border-gray-600"
        )}>
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                <h3 className="text-xl font-bold">{session.jour}</h3>
                <span className="text-gray-300">
                    {format(sessionDate, 'dd/MM/yyyy', { locale: fr })}
                </span>
            </div>
            
            <div className="mb-4">
                <p className="text-lg">
                    {format(sessionDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Vote avant : {format(deadline, "dd/MM 'à' HH:mm", { locale: fr })}
                </p>
            </div>

            {!isLocked ? (
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => onVote(session.id, true)}
                        className={clsx(
                            "flex-1 py-2 rounded font-bold transition-colors",
                            myVote === 'present' 
                                ? "bg-success text-white" 
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        )}
                    >
                        Présent
                    </button>
                    <button 
                        onClick={() => onVote(session.id, false)}
                        className={clsx(
                            "flex-1 py-2 rounded font-bold transition-colors",
                            myVote === 'absent' 
                                ? "bg-danger text-white" 
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        )}
                    >
                        Absent
                    </button>
                </div>
            ) : (
                <div className="bg-gray-700 text-gray-400 text-center py-2 rounded mb-4">
                    Vote clos
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-700">
                <strong className="block text-sm text-gray-400 mb-1">
                    Inscrits ({presentCount}) :
                </strong>
                <p className="text-sm text-gray-300">
                    {presentList || 'Aucun inscrit'}
                </p>
            </div>
        </div>
    );
};

export default SessionCard;
