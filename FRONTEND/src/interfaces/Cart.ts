import { IProduct } from './Product'

export interface ICartItem extends IProduct {
  quantidade: number
}

export interface ICart {
  cartProducts: ICartItem[]
}
