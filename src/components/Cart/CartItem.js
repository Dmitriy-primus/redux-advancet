import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props;

  const dispatchAction = useDispatch();
  const addProduct = () => {
    dispatchAction(
      cartAction.addProduct({
        id,
        title,
        price,
        total,
      })
    );
  };

  const removeProduct = () => {
    dispatchAction(cartAction.removeProduct(id));
  };
  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles["item-price"]}>
            (${price.toFixed(2)} / шт.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={removeProduct}>-</button>
          <button onClick={addProduct}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
