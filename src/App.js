import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import { sendCartData, getCartData, isCloseBar } from "./store/cart-slice";

let isInitialRunning = true;

function App() {
  const cart = useSelector((state) => state.cartManage);
  const visibilityCart = useSelector(
    (state) => state.visibility.visibilityCart
  );
  const visibilityBar = useSelector(
    (state) => state.cartManage.isCartContentChanged
  );
  const statusMessage = useSelector((state) => state.visibility.statusMessage);
  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(getCartData());
  }, []);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }
    dispatchAction(sendCartData(cart));
    // setTimeout(() => {
    //   dispatchAction(isCloseBar(false));
    // }, 3000);
  }, [cart]);

  return (
    <Fragment>
      {statusMessage && visibilityBar && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {visibilityCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
