export const getTotalWithShippingAndDiscount = (
  itemsAmount: number,
  shippingAmount: number,
  discountAmount: number | null,
) => {
  if (discountAmount === null) {
    return itemsAmount + shippingAmount;
  }
  return itemsAmount - itemsAmount * discountAmount + shippingAmount;
};
