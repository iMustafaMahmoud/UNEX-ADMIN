import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
//
import { dispatch } from '../store';
import { AddCategoryPayload, CategoriesState } from 'src/@types/categories';

// ----------------------------------------------------------------------

const initialState: CategoriesState = {
  categories: [],
  currentCategory: [],
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // START LOADING

    // HAS ERROR
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setCategories, setCurrentCategory } = slice.actions;

// ----------------------------------------------------------------------

export function getCategories() {
  return async () => {
    try {
      const response = await axios.get('/category/getAll');
      dispatch(slice.actions.setCategories(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}

// ----------------------------------------------------------------------

export function createCategory(category: AddCategoryPayload) {
  return async () => {
    try {
      const response = await axios.post('/category/add', category);
      dispatch(slice.actions.setCategories(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}

export function editCategory(id: string, category: AddCategoryPayload) {
  return async () => {
    try {
      await axios.post('/category/update', category, { params: { id } });
      dispatch(getCategories());
    } catch (error) {
      console.log({ error });
    }
  };
}

export function deleteCategory(id: string) {
  return async () => {
    try {
      await axios.post(`/category/delete`, null, { params: { id } });
      dispatch(getCategories());
    } catch (error) {
      console.log({ error });
    }
  };
}

export function getCategoryById(id: string) {
  return async () => {
    try {
      const response = await axios.get(`/category/getbyid`, {
        params: { id, admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
      dispatch(slice.actions.setCurrentCategory(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}
