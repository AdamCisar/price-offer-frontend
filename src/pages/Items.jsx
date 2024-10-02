import { useContext, useState } from "react";
import { ItemsContext } from "../providers/ItemsProvider";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import Loading from "../components/utilities/Loading";
import AppButtonModal from "../components/utilities/AppButtonModal";
import ItemEditModal from "../components/items/ItemEditModal";

const boxStyles = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 4,
    sx: { backgroundColor: '#f5f5f5', minHeight: '100vh' }
};

const Items = () => {
    const { items, isLoading, error } = useContext(ItemsContext);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
  
    const filteredItems = items && items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (isLoading) {
        return <Loading />;
    }
  
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Box sx={boxStyles}>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        fullWidth
                        onChange={handleSearchChange}
                        value={searchTerm}
                        sx={{ mb: 2 }} 
                    />
                </Grid2>
  
                <Grid2 item xs={12}>
                    {filteredItems && filteredItems.length > 0 ? (
                        <Grid2 container spacing={2}>
                            {filteredItems.map((item) => (
                                <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <AppButtonModal
                                                styles={{ variant: 'contained', color: '' }}
                                                title={"Upraviť"} 
                                                Button={Button}
                                                ModalComponent={ItemEditModal}
                                                item={item}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    ) : (
                        <Typography variant="body1" align="center" mt={2} xs={12}>
                            No items found.
                        </Typography>
                    )}
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Items;
