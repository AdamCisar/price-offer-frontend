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
        <div
            className="item-card"
            key={item.id}
            onClick={handleSelectClick}
            style={!isEditing ? {} : { cursor: 'pointer' }}
            >
            <Card
                sx={{
                width: '100%',
                width: 300,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                position: 'relative',
                }}
            >
                <CardContent sx={{ flex: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography sx={{ fontWeight: '500', borderBottom: '1px solid #ccc', paddingBottom: '5px', width: '100%' }}>
                        {item.title}
                        </Typography>
                    </div>
                </CardContent>
                <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <Typography variant="p3">{item.price} €</Typography>
                </Box>
                    {isEditing && <CheckIcon selected={selected} />}
                <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <AppButtonModal
                        styles={{ variant: 'outlined', color: 'primary' }}
                        title={"Upraviť"}
                        Button={Button}
                        ModalComponent={ItemEditModal}
                        item={item}
                        setItems={setItems}
                        disabled={isEditing}
                    />
                </Box>
            </Card>
        </div>
    );
}

export default ItemCard