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
  
    return (
        <Box {...boxStyles}>
            <div style={{ minWidth: '100%' }}>
                <div style={{
                    margin: '0 auto',
                    width: '50%',
                    marginBottom: '20px',
                }}>
                    <TextField
                        id="search"
                        label="Filtrovať"
                        variant="outlined"
                        fullWidth
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 0fr))',
                    gap: '16px',
                    justifyContent: 'center'
                }}>
                    {filteredItems && filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} setItems={setItems}/>
                    ))}
                </div>
            </div>
        </Box>
    );
}

export default Items;
