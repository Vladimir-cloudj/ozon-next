import { Product } from "./models/product.model";
import { Query } from "./models/query.model";

export const getData = async (query: Query) => {
  const response = await fetch(
    "https://ozon-d3bcc-default-rtdb.firebaseio.com/goods.json"
  );
  const data = await response.json();

  return data.filter((product: Product) => {
    if (query.category) {
        if (query.category !== product.category) {
            return false
        }
    }
    if (query.search) {
        if (!product.title.toLowerCase().includes(query.search.toLowerCase())) {
            return false
        }
    }
    return true
  })
};
