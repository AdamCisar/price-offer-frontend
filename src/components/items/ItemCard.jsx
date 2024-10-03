import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import AppButtonModal from "../utilities/AppButtonModal";
import ItemEditModal from "./ItemEditModal";

const ItemCard = (props) => {
    const { item, setItems } = props;
    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative' }}>
                <CardContent sx={{ flex: 'auto', minWidth: 250, maxWidth: 250, minHeight: 100, maxHeight: 100 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography sx={{ fontWeight: '500', borderBottom: '1px solid #ccc', paddingBottom: '5px', width: '100%' }}>{item.title}</Typography>
                    </div>
                </CardContent>
                <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <Typography variant="p3">{item.price} €</Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <AppButtonModal
                        styles={{ variant: 'outlined', color: 'primary' }}
                        title={"Upraviť"} 
                        Button={Button}
                        ModalComponent={ItemEditModal}
                        item={item}
                        setItems={setItems}
                    />
                </Box>
            </Card>
        </Grid2>
    );
}

export default ItemCard