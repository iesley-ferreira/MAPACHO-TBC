export interface IProduct {
  id: number
  idProdutoPai: number
  nome: string
  codigo: string
  preco: number
  tipo: string
  situacao: string
  formato: string
  descricaoCurta: string
  imagemURL: string
}

export interface ProductResponse {
  data: IProduct[]
}
