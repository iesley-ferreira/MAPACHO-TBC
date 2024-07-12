export interface IMercadoPagoCreatePixRequest {
  transaction_amount: number;
  description: string;
  paymentMethodId: string;
  email: string;
  identificationType: string;
  number: string;
}

export interface IMercadoPagoCreatePixResponse {
  ticketUrl: string;
}
