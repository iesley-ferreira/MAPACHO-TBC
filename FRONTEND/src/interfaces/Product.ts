export interface IProduct {
  id: string
  nome: string
  preco: number
  imageUrl: string
}

export interface ProductResponse {
  data: IProduct[]
}
