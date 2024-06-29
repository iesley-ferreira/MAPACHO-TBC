import { AddressRequest } from "mercadopago/dist/clients/payment/create/types"

export type PaymentMethodsType = 'pix' | 'visa' //Depois adiciona os outros metodos de pagamento

export type PaymentGenerateType = {
  payMethod: PaymentMethodsType,
  description?: string,
  price: number,
  payer?: {
    paymentEmail: string,
    paymentName: string,
    address: AddressRequest,
  }
}
