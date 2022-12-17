export type CategoriesState = {
  categories: Categories[];
  currentCategory: EditCategoryPayload[];
};

export interface Categories {
  id: number;
  name: string;
}

export interface AddCategoryPayload {
  enName: string;
  arName: string;
}

export interface EditCategoryPayload {
  arCateogryName: string;
  enCategoryName: string;
}
