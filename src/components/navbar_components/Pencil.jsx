import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { PencilEditContext } from '../../providers/PencilEditProvider';

const Pencil = () => {
    const { setIsEditing } = useContext(PencilEditContext);

    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    }

    return (
        <div onClick={handleEditClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <EditIcon />
        </div>
    )
}

export default Pencil