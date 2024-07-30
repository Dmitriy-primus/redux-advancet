import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";

const ProductItem = (props) => {
  // const cart = useSelector((state) => state.cartManage);
  const { id, title, price, description } = props;

  const dispatchAction = useDispatch();

  const addProductHendler = () => {
    // const updatedProductsQuanyity = cart.productsQuantity + 1;
    // const updatedProducts = cart.products.slice();
    // const existingProduct = updatedProducts.find((item) => item.id === id);
    // if (existingProduct) {
    //   const updatedExistingProduct = { ...existingProduct };
    //   updatedExistingProduct.quantity++;
    //   updatedExistingProduct.price = updatedExistingProduct.price + price;
    //   const existingProductIndex = updatedProducts.findIndex(
    //     (product) => product.id === id
    //   );
    //   updatedProducts[existingProductIndex] = updatedExistingProduct;
    // } else {
    //   updatedProducts.push({
    //     id: id,
    //     price: price,
    //     quantity: 1,
    //     totalPrice: price,
    //     title: title,
    //   });
    // }
    // const updatedCart = {
    //   productsQuantity: updatedProductsQuanyity,
    //   products: updatedProducts,
    // };
    // dispatchAction(cartAction.updateCart(updatedCart));
    dispatchAction(
      cartAction.addProduct({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addProductHendler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
