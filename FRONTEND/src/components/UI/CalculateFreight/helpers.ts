// export const calculateMotorcycleDelivery = (distanceInKilometers: number): number => {
//   const deliveryRates = [
//     { limit: 2, value: 5 },
//     { limit: 5, value: 8 },
//     { limit: 7, value: 10 },
//     { limit: 10, value: 15 },
//     { limit: 15, value: 20 },
//     { limit: 20, value: 25 },
//     { limit: 25, value: 30 },
//   ];

//   for (const rate of deliveryRates) {
//     if (distanceInKilometers <= rate.limit) {
//       return rate.value;
//     }
//   }

//   return 0;
// };

// export const calculateScheduledDelivery = (distanceInKilometers: number): number => {
//   const deliveryRates = [
//     { limit: 8, value: 4 },
//     { limit: 20, value: 8 },
//   ];

//   for (const rate of deliveryRates) {
//     if (distanceInKilometers <= rate.limit) {
//       return rate.value;
//     }
//   }

//   return 0;
// };
