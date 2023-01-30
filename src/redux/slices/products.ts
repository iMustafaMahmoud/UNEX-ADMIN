import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
//
import { dispatch } from '../store';
import { AddCategoryPayload } from 'src/@types/categories';
import {
  AddProductPayload,
  EditProductPayload,
  ProductsState,
  SizesCount,
} from 'src/@types/products';

// ----------------------------------------------------------------------

const initialState: ProductsState = {
  products: [],
  currentProduct: [],
};

const slice = createSlice({
  name: 'prodcuts',
  initialState,
  reducers: {
    // START LOADING

    // HAS ERROR
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setProducts, setCurrentProduct } = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    try {
      const response = await axios.get('/product/getall');
      dispatch(slice.actions.setProducts(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}

// ----------------------------------------------------------------------

export function createProduct(subcategoryId: string, product: AddProductPayload) {
  return async () => {
    try {
      const response = await axios.post('/product/addproduct', product, {
        params: { subcategoryId },
      });
      dispatch(getProducts());
    } catch (error) {
      console.log({ error });
    }
  };
}

export function editProduct(id: string, product: EditProductPayload) {
  return async () => {
    try {
      await axios.post('/product/UpdateProduct', product, { params: { id } });
      dispatch(getProducts());
    } catch (error) {
      console.log({ error });
    }
  };
}

export function deleteProduct(id: string) {
  return async () => {
    console.log("deteket")
    try {
      await axios.post(`product/DeleteProduct`, null, { params: { id } });
      console.log("success")
      dispatch(getProducts());
    } catch (error) {
          console.log('deteket Error');

      console.log({ error });
    }
  };
}
export function DeleteInfo(id: string) {
  return async () => {
    try {
      await axios.post(`/product/DeleteInfo`, null, { params: { id } });
    } catch (error) {
      console.log({ error });
    }
  };
}
export function DeleteItem(id: string) {
  return async () => {
    try {
      await axios.post(`/product/DeleteItem`, null, { params: { id } });
    } catch (error) {
      console.log({ error });
    }
  };
}
export function UpdateItem(id: string, item: SizesCount) {
  return async () => {
    try {
      await axios.post(`/product/UpdateItem`, item, { params: { id } });
    } catch (error) {
      console.log({ error });
    }
  };
}
export function UpdateInfo(id: string, data: string) {
  return async () => {
    try {
      await axios.post(`/product/UpdateInfo`, { color: data }, { params: { id } });
    } catch (error) {
      console.log({ error });
    }
  };
}
export function getProductById(id: string) {
  return async () => {
    try {
      const response = await axios.get(`/product/getbyid`, {
        params: { id, admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
      dispatch(slice.actions.setCurrentProduct(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}
