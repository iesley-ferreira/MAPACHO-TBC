export interface IProduct {
  id: number
  nome: string
  preco: number
  imageUrl: string
}

export interface ProductResponse {
  data: IProduct[]
}
