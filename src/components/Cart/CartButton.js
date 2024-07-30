import { cartButtonAction } from "../../store/cartButton-slice";
import styles from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const quantity = useSelector((state) => state.cartManage.productsQuantity);
  const dispatchAction = useDispatch();
  const visibilityCartHandler = () => {
    dispatchAction(cartButtonAction.cartVisibility());
  };
  return (
    <button className={styles.button} onClick={visibilityCartHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
