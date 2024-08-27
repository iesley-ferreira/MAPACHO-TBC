export interface createPreferenceResponse {
  status: number;
  preferenceId?: number;
  message?: string;
  insufficientStockItems?: insufficientStockItems[];
}

export interface insufficientStockItems {
  id: number;
  availableQuantity: number;
}
