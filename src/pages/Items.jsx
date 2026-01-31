import { useContext, useState } from "react";
import { ItemsContext } from "../providers/ItemsProvider";
import { Box, TextField, Typography } from "@mui/material";
import Loading from "../components/utilities/Loading";
import ItemCard from "../components/items/ItemCard";

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
        <Box style={{ 
            height: '100%',
            backgroundColor: '#f5f5f5', 
            display: 'grid',
            gridTemplateRows: '5em 1fr',
            padding: '1em',
        }}>
            <div style={{
                width: '30%',
            }}>
                <TextField
                    id="search"
                    label="Vyhľadať..."
                    variant="outlined"
                    fullWidth
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gridAutoRows: '12.5em',
                gap: '10px',
            }}>
                {filteredItems && filteredItems.map((item) => (
                    <ItemCard key={item.id} item={item} setItems={setItems}/>
                ))}
            </div>
        </Box>
    );
}

export default Items;
