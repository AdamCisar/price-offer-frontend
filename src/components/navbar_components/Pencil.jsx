import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { PencilEditContext } from '../../providers/PencilEditProvider';

const Pencil = () => {
    const { isEditing, setIsEditing } = useContext(PencilEditContext);

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    }

    return (
        <div onClick={handleEditClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <EditIcon 
                sx={{
                    color: isEditing ? 'black' : 'inherit',
                    stroke: isEditing ? 'white' : 'none',
                    strokeWidth: isEditing ? 1.8 : 0,
                }}
            />
        </div>
    )
}

export default Pencil