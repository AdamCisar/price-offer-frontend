import { ProductsContext } from "../providers/ProductsProvider";
import { useContext } from "react";
import ProductSnapshot from "./ProductSnapshot";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';


const ProductTable = () => {
    const { products, isLoading, error } = useContext(ProductsContext);

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 850 }} >
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell>Nazov</TableCell>
              <TableCell>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ProductTable