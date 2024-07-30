import { createSlice } from "@reduxjs/toolkit";
import { cartButtonAction } from "./cartButton-slice";

const initialState = {
  products: [],
  productsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: "cartManage",
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );
      state.productsQuantity++;
      state.isCartContentChanged = true;
      if (!existingProduct) {
        state.products.push({
          id: newProduct.id,
          title: newProduct.title,
          price: newProduct.price,
          quantity: 1,
          totalPrice: newProduct.price,
        });
      } else {
        existingProduct.quantity++;
        existingProduct.totalPrice =
          existingProduct.price * existingProduct.quantity;
      }
      // setTimeout(() => {
      //   return (state.isCartContentChanged = false);
      // }, 3000);
    },
    removeProduct(state, action) {
      const id = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      state.productsQuantity--;
      state.isCartContentChanged = true;
      if (existingProduct.quantity === 1) {
        state.products = state.products.filter((product) => product.id !== id);
      } else {
        existingProduct.quantity--;
        existingProduct.totalPrice =
          existingProduct.totalPrice - existingProduct.price;
      }
    },
    updateCart(state, action) {
      state.products = action.payload.products;
      state.productsQuantity = action.payload.productsQuantity;
    },
    changeBarVisible(state, action) {
      state.statusBarMessage = action;
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      cartButtonAction.statusBarMessage({
        status: "pending",
        message: "Происходит загрузка данных",
        title: "Данные загружаются",
      })
    );
    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-course-http-5209d-default-rtdb.firebaseio.com/Cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            products: cartData.products,
            productsQuantity: cartData.productsQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так(");
      }
    };
    try {
      await sendDataHttpRequest();
      dispatchAction(
        cartButtonAction.statusBarMessage({
          status: "success",
          message: "Загрузка данных прошла успешно",
          title: "Данные загружены",
        })
      );
    } catch (e) {
      dispatchAction(
        cartButtonAction.statusBarMessage({
          status: "Ошибка загрузки",
          message: "Сбой при загрузке данных",
          title: "error",
        })
      );
    }
  };
};

export const getCartData = () => {
  return async (dispatchAction) => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-course-http-5209d-default-rtdb.firebaseio.com/Cart.json"
      );
      if (!response.ok) {
        throw new Error("Невозможно извлеч данные");
      }
      const data = response.json();
      return data;
    };
    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartSlice.actions.updateCart({
          products: cartData.products || [],
          productsQuantity: cartData.productsQuantity,
        })
      );
    } catch (error) {
      dispatchAction(
        cartButtonAction.statusBarMessage({
          status: "Ошибка загрузки",
          message: "Сбой при загрузке данных",
          title: "error",
        })
      );
    }
  };
};

export const isCloseBar = (bool) => {
  return (dispatchAction) => {
    dispatchAction(cartSlice.actions.changeBarVisible(bool));
  };
};
export const cartAction = cartSlice.actions;

export default cartSlice;
