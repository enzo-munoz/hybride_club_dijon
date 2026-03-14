const CoachCard = ({ coach }) => {
    return (
        <div className="bg-secondary p-4 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300">
            <img 
                src={coach.photo || 'https://via.placeholder.com/300x300'}
                alt={`${coach.prenom} ${coach.nom}`} 
                className="w-full h-72 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-1">{coach.prenom} {coach.nom}</h3>
            <p className="text-primary font-medium mb-2">{coach.role_club}</p>
            <p className="text-gray-300 text-sm">{coach.bio}</p>
        </div>
    );
};

export default CoachCard;
