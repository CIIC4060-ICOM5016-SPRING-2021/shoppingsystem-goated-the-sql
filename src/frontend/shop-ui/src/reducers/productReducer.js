function productReducer(state = { products: [] }, action) {
  switch (action.type) {
    //   TODO: Add logic to this that actually works
    case "products/getall":
      return null;
    default:
      return state;
  }
}

export default productReducer;
