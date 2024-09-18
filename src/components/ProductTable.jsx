import { ProductsContext } from "../providers/ProductsProvider";
import { useContext } from "react";
import ProductSnapshot from "./ProductSnapshot";

const ProductTable = () => {
    const { products, isLoading, error } = useContext(ProductsContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nazov</th>
                    <th>Cena</th>
                </tr>
            </thead>

            <tbody>
                {products && products.map((product) => (
                    <tr key={product.id}>
                        <ProductSnapshot {...product} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable