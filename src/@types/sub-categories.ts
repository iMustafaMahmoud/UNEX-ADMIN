export type SubCategoriesState = {
  subCategories: SubCategories[];
  currentSubCategory: EditSubCategoryPayload[];
};

export interface SubCategories {
  id: number;
  name: string;
}

export interface AddCategoryPayload {
  enName: string;
  arName: string;
}

export interface EditSubCategoryPayload {
  arSubCateogryName: string;
  enSubCategoryName: string;
}

export interface SubCategoriesForGetAll {
  id: number;
  enName: string;
  arName: string;
}
