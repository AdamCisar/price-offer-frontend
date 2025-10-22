import { PencilEditContext } from '../../providers/PencilEditProvider';
import { useContext } from 'react';
import TrashCan from './TrashCan';
import Pencil from './Pencil';
import { useLocation } from 'react-router-dom';

export const PencilWrapper = () => {
    const { isEditing } = useContext(PencilEditContext);
    const location = useLocation();

    return (
        <>
            {isEditing && location.pathname === '/produkty' ? <TrashCan /> : null}
            <Pencil />
        </>
    )
}