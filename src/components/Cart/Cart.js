import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const products = useSelector((state) => state.cartManage.products);

  return (
    <Card className={styles.cart}>
      <h2>Мои Покупки</h2>
      <ul>
        {products.map((product) => (
          <CartItem
            key={product.id}
            id={product.id}
            title={product.title}
            quantity={product.quantity}
            total={product.totalPrice}
            price={product.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
