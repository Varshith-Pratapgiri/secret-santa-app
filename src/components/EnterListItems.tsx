
type ParticipantItemProps = {
    id: number;
    name: string;
    onRemove: (id : number) => void;
};

export const ParticipantItem = ({ id, name, onRemove }: ParticipantItemProps) => {
    return(
        <li className="list-item">
            <span>{name}</span>
            <button 
            type="button"
            className="remove-btn"
            onClick={() => onRemove(id)}>
                x
            </button>
        </li>
    );
}