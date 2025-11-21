import { Product } from "./models/product.model";
import { Query } from "./models/query.model";

export const getData = async (query: Query) => {
  console.log(query);
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
    return true
  })
};
