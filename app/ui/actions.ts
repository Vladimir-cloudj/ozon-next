export const getData = async () => {
    const response = await fetch(
      "https://ozon-d3bcc-default-rtdb.firebaseio.com/goods.json"
    );
    const data = await response.json();
    return data
};