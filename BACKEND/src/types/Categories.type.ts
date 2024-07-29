export interface CategoriesBlingType {
  id: number,
  descricao: string,
  categoriaPai: {
    id: number
  }
}

export interface CategoriesFormateType   {
  id: number,
  description: string,
  subCategories: {
    id: number,
    categoryFather: number,
    description: string,
  }[],
  products?: any
}
