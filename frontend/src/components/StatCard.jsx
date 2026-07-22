const StatCard = ({ title, value, icon, bgColor }) => {
    return (
        <div className="card shadow border-0">
            <div className={`card-body text-center ${bgColor} text-white`}>

                <div className="mb-3">
                    {icon}
                </div>

                <h5>{title}</h5>

                <h2>{value}</h2>

            </div>
        </div>
    );
};

export default StatCard;