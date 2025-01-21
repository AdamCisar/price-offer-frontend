import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import AppButtonModal from "../utilities/AppButtonModal";
import ItemEditModal from "./ItemEditModal";
import { useContext, useState } from "react";
import { PencilEditContext } from "../../providers/PencilEditProvider";
import { CircleIndicator } from "../price_offer_cards/PriceOfferSnapshot";

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
        <Grid2 className="item-card" item xs={12} sm={6} md={4} lg={3} key={item.id} onClick={handleSelectClick} style={!isEditing ? {} : {cursor: 'pointer' }} >
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative' }}>
                <CardContent sx={{ flex: 'auto', minWidth: 250, maxWidth: 250, minHeight: 100, maxHeight: 100 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography sx={{ fontWeight: '500', borderBottom: '1px solid #ccc', paddingBottom: '5px', width: '100%' }}>{item.title}</Typography>
                    </div>
                </CardContent>
                <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <Typography variant="p3">{item.price} €</Typography>
                </Box>
                {isEditing && <CircleIndicator selected={selected} />}
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
        </Grid2>
    );
}

export default ItemCard