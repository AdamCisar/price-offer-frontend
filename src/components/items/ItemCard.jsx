import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import AppButtonModal from "../utilities/AppButtonModal";
import ItemEditModal from "./ItemEditModal";
import { useContext, useState } from "react";
import { PencilEditContext } from "../../providers/PencilEditProvider";
import CheckIcon from "../utilities/CheckIcon";

const ItemCard = (props) => {
    const { item, setItems } = props;
    const [selected, setSelected] = useState(false);
    const { isEditing, handleSelected } = useContext(PencilEditContext);
    
    const handleSelectClick = () => {
        if (!isEditing) {
          return;
        }
    
        handleSelected(item.id);
        setSelected((prev) => !prev);
    };

    return (
        <Card
            className="item-card"
            key={item.id}
            onClick={handleSelectClick}
            sx={{
                ...(isEditing && { cursor: 'pointer' }),
                height: '12em',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gridTemplateRows: '1.5fr 2fr 1fr',
                gridTemplateAreas: `
                "title title title"
                ". . ."
                "price . edit"
                `,
                padding: '5px',
            }}
        >
            <Typography 
                style={{ 
                    width: '100%',
                    gridArea: 'title',
                    fontWeight: '500', 
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {item.title}
            </Typography>

            <Typography 
                variant="p3"
                style={{
                    gridArea: 'price',
                    alignSelf: 'center',
                }}
            >
                {item.price} €
            </Typography>
                
            {isEditing && <CheckIcon 
                            selected={selected} 
                            style={{ 
                                gridArea: 'title',
                                justifySelf: 'end',
                            }}
                        />
            }

            <AppButtonModal
                divStyles={{
                    gridArea: 'edit'
                }}
                styles={{ 
                    variant: 'outlined', 
                    color: 'primary',
                }}
                title={"Upraviť"}
                Button={Button}
                ModalComponent={ItemEditModal}
                item={item}
                setItems={setItems}
                disabled={isEditing}
            />
        </Card>
    );
}

export default ItemCard