export interface IFormattedSubcategory {
  id: string;
  description: string;
}

export interface IFormattedCategory {
  id: string;
  description: string;
  subcategories: IFormattedSubcategory[];
}

export interface ICategory {
  id: number;
  descricao: string;
  categoriaPai: { id: number };
}

export interface ISubCategory {
  id: number;
  descricao: string;
  categoriaPai: { id: number };
}

export interface CategoryResponse {
  data: ICategory[];
}

export interface ICategoryId {
  id: number;
}
