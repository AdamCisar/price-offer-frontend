import { useContext } from "react";
import { ItemsContext } from "./ItemsProvider";
import { PriceOfferListContext } from "./PriceOfferListProvider";

const GetProvider = () => {
    let activeProvider = null;
    const itemsContext = useContext(ItemsContext);
    const priceOfferContext = useContext(PriceOfferListContext);
  
    if (itemsContext) {
      activeProvider = itemsContext;
    } else if (priceOfferContext) {
      activeProvider = priceOfferContext;
    }
  
    return activeProvider;
};

export default GetProvider;