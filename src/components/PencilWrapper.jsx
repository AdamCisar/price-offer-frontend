import { PencilEditContext } from '../providers/PencilEditProvider';
import { useContext } from 'react';
import TrashCan from './TrashCan';
import Pencil from './Pencil';

export const PencilWrapper = () => {
    const { isEditing } = useContext(PencilEditContext);
    
    return (
        <>
            {isEditing ? <TrashCan /> : null}
            <Pencil />
        </>
    )
}