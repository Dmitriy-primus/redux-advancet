import { useEffect } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { useState } from "react";

const Products = (props) => {
  const [stateProduct, setStateProduct] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const fetchProductDownload = async () => {
    setLoadingState(true);
    try {
      const response = await fetch(
        "https://react-course-http-5209d-default-rtdb.firebaseio.com/Products.json"
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так");
      }
      const data = await response.json();

      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          price: data[key].price,
        });
      }
      console.log(loadedData);
      setStateProduct(loadedData);
    } catch (e) {
      console.log(e.message);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    fetchProductDownload();
  }, []);

  const productItemData = stateProduct.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      description={item.description}
    />
  ));
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      {loadingState && <p>Идет загрузка...</p>}
      <ul>{productItemData}</ul>
    </section>
  );
};

export default Products;
