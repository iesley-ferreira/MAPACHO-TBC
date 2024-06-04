export interface ICategory {
  id: number
  descricao: string
  categoriaPai: { id: number }
}

export interface ISubCategory {
  id: number
  descricao: string
  categoriaPai: { id: number }
}

export interface CategoryResponse {
  data: ICategory[]
}
