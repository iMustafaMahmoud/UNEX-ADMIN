import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
//
import { dispatch } from '../store';
import { AddCategoryPayload } from 'src/@types/categories';
import { SubCategoriesState } from 'src/@types/sub-categories';

// ----------------------------------------------------------------------

const initialState: SubCategoriesState = {
  subCategories: [],
  currentSubCategory: [],
};

const slice = createSlice({
  name: 'sub-categories',
  initialState,
  reducers: {
    // START LOADING

    // HAS ERROR
    setSubCategories(state, action) {
      state.subCategories = action.payload;
    },
    setSubCurrentCategory(state, action) {
      state.currentSubCategory = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setSubCategories, setSubCurrentCategory } = slice.actions;

// ----------------------------------------------------------------------

export function getSubCategories(categoryId: string) {
  return async () => {
    try {
      const response = await axios.get('/subcategory/getAll', { params: { categoryId } });
      dispatch(slice.actions.setSubCategories(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}

// ----------------------------------------------------------------------

export function createSubCategory(id: string, category: AddCategoryPayload) {
  return async () => {
    try {
      const response = await axios.post('/subcategory/add', category, {
        params: { categoryId: id },
      });
      dispatch(slice.actions.setSubCategories(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}

export function editSubCategory(id: string, SubCategoryId: string, category: AddCategoryPayload) {
  return async () => {
    try {
      await axios.post('/subcategory/update', category, { params: { id: SubCategoryId } });
      dispatch(getSubCategories(id));
    } catch (error) {
      console.log({ error });
    }
  };
}

export function deleteSubCategory(id: string, categoryId: string) {
  return async () => {
    try {
      await axios.post(`/subcategory/delete`, null, { params: { id } });
      dispatch(getSubCategories(categoryId));
    } catch (error) {
      console.log({ error });
    }
  };
}

export function getSubCategoryById(id: string) {
  return async () => {
    try {
      const response = await axios.get(`/subcategory/getbyid`, {
        params: { id, admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
      dispatch(slice.actions.setSubCurrentCategory(response.data));
    } catch (error) {
      console.log({ error });
    }
  };
}
