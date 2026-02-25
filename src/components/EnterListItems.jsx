export const ParticipantItem = ({name, onRemove}) => {
    return(
        <li className="list-item">
            <span>{name}</span>
            <button 
            type="button"
            className="remove-btn"
            onClick={() => onRemove(name)}>
                x
            </button>
        </li>
    );
}