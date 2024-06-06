export interface IProduct {
  id: number
  nome: string
  preco: number
  imagemURL: string
}

export interface ICartItem {
  id: number
  quantity: number
}

export interface ProductResponse {
  data: IProduct[]
}
