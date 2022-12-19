import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import categoriesReducer from './slices/categories';
import subCategoriesReducer from './slices/sub-categories';
import productsReducer from './slices/products';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};



const rootReducer = combineReducers({
  
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  products: productsReducer,
});

export { rootPersistConfig, rootReducer };
