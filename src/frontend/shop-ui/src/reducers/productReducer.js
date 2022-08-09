import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    getAllProducts: state => {}
  }
})

export const { getAllProducts } = productSlice.actions
