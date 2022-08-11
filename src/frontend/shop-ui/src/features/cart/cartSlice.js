import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getCartItems = createAsyncThunk('cart/getItems', (id) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/cart/${id}`)
    .then((response) => response.json())
    .catch((error) =>
      console.log(error));
});

export const addProductToCartDB = createAsyncThunk('cart/addProductToCart', (requiredInfo) => {
  const{product, user_id} = requiredInfo;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "user_id": user_id,
      "product_id": product.id,
      "quantity": 1
    })
  }

  return fetch(`http://127.0.0.1:5000/goated_the_sql/product/${user_id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error));
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    //It is true because the cart is fetched at the beginning
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    increaseCartItemQuantity: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
      cartItem.quantity++;
      state.total += cartItem.product_price;
    },
    decreaseCartItemQuantity: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
      cartItem.quantity--;
      state.total += cartItem.product_price;

      if (cartItem.quantity <= 0) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.product_id !== action.payload);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log('The cart has been fetched: ' + action)
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
    [addProductToCartDB.pending]: () => {
      console.log("Adding product to cart");
    },
    [addProductToCartDB.fulfilled]: () => {
      console.log("Product added to cart");
    },
    [addProductToCartDB.rejected]: () => {
      console.log("Product adding to cart failed");
    }
  }
});

export const {
  setTotal,
  clearCart,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;