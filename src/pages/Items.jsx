import { useContext, useState } from "react";
import { ItemsContext } from "../providers/ItemsProvider";
import { Box, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import Loading from "../components/utilities/Loading";
import ItemCard from "../components/items/ItemCard";

const boxStyles = {
    display: "flex",
    padding: 4,
    sx: { backgroundColor: '#f5f5f5', minHeight: '100vh' }
};

const Items = () => {
    const { items, setItems, isLoading, isFetching, error } = useContext(ItemsContext);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
  
    const filteredItems = items && items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (isLoading || isFetching) {
        return <Loading />
    }
  
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Box {...boxStyles}>
            <Grid2 container spacing={2} sx={{ flexDirection: 'column', width: '100%' }}>
                <Grid2 item xs={12}>
                    <TextField
                        id="search"
                        label="Filtrovať"
                        variant="outlined"
                        fullWidth
                        onChange={handleSearchChange}
                        value={searchTerm}
                        sx={{ mb: 2 , width: '20%'}} 
                    />
                </Grid2>
  
                <Grid2 item xs={12}>
                    {filteredItems && filteredItems.length > 0 && (
                        <Grid2 container spacing={1}>
                            {filteredItems.map((item) => (
                                <ItemCard key={item.id} item={item} setItems={setItems}/>
                            ))}
                        </Grid2>
                    )}
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Items;
