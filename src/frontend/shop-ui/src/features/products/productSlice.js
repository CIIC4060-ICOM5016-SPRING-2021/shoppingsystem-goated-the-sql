import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
  return fetch('http://127.0.0.1:5000/goated_the_sql/products/all')
      .then((response) => response.json())
      .catch((error) =>
          console.log(error));
});
export const updateProduct = createAsyncThunk('products/updateProduct', (requiredInfo) => {
  const {requesterId, product} = requiredInfo;

  const productBodyRequest = {
    product_id: product.product_id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    visible: product.visible
  }

  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify([
          {
            user_id: requesterId,
          },
          productBodyRequest
        ]
    )
  }

  return fetch(`http://127.0.0.1:5000/goated_the_sql/product/${product.product_id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log(error));
});
export const deleteProduct = createAsyncThunk('products/deleteProduct', (requiredInfo) => {
  const {requesterId, product} = requiredInfo;

  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user_id: requesterId})
  }

  return fetch(`http://127.0.0.1:5000/goated_the_sql/product/${product.id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log(error));
});
export const addNewProductToDB = createAsyncThunk('products/addNewProductToDB', (requiredInfo) => {
  const {product} = requiredInfo;

  const productBodyRequest = {
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
  }

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
          productBodyRequest
    )
  }

  return fetch("http://127.0.0.1:5000/goated_the_sql/product/add", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error));
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCopy: [],
    //It is true because the products are fetched at the beginning
    isLoading: true,
    modified: false,
  },
  reducers: {
    setProductDetails: (state, action) => {
      //find the item in the products array with the same id as the one we want to update and update it
      const index = state.products["Products"].findIndex(item => item.id === action.payload.id);
      state.products["Products"][index] = action.payload;
    },
    orderByPriceAsc: (state) => {
      state.products["Products"].sort((a, b) => a.price - b.price);
    },
    orderByPriceDesc: (state) => {
      state.products["Products"].sort((a, b) => b.price - a.price);
    },
    orderByNameAsc: (state) => {
      state.products["Products"].sort((a, b) => a.name.localeCompare(b.name));
    },
    orderByNameDesc: (state) => {
      state.products["Products"].sort((a, b) => b.name.localeCompare(a.name));
    },
    filterByCat: (state, action) => {
      if (action.payload.value === "all") {
        state.products["Products"] = state.productsCopy;
        state.modified = false;
      } else {
        if (state.modified === false) {
          state.products["Products"] = state.products["Products"].filter((product) => product.category.toLowerCase() === action.payload.value);
          state.modified = true;
        } else {
          state.products["Products"] = state.productsCopy;
          state.products["Products"] = state.products["Products"].filter((product) => product.category.toLowerCase() === action.payload.value);
        }
      }
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      console.log("Loading products");
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log("Products loaded");
      state.products = action.payload;
      state.productsCopy = action.payload["Products"];
      state.isLoading = false;
    },
    [getAllProducts.rejected]: (state) => {
      console.log("Products loading failed");
      state.isLoading = false;
    },
    [updateProduct.pending]: (state) => {
      console.log("Updating product");
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state) => {
      console.log("Product updated");
      state.isLoading = false;
    },
    [updateProduct.rejected]: (state) => {
      console.log("Product update failed");
      state.isLoading = false;
    },
    [deleteProduct.pending]: () => {
      console.log("Deleting product");
    },
    [deleteProduct.fulfilled]: () => {
      console.log("Product deleted");
    },
    [deleteProduct.rejected]: () => {
      console.log("Product delete failed");
    },
    [addNewProductToDB.pending]: (state) => {
      console.log("Adding product");
      state.isLoading = true;
    },
    [addNewProductToDB.fulfilled]: (state, action) => {
      console.log("Product added");
      state.products["Products"].push(action.payload);
      state.isLoading = false;
    },
    [addNewProductToDB.rejected]: (state) => {
      console.log("Product add failed");
      state.isLoading = false;
    }
  }
});

export const {orderByPriceAsc, orderByPriceDesc, orderByNameAsc, orderByNameDesc, filterByCat, setProductDetails} = productSlice.actions;
export default productSlice.reducer;