/*
  Warnings:

  - The values [approved,pending] on the enum `PaymentStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatusEnum_new" AS ENUM ('placed', 'processing', 'preparing', 'shipped', 'in_transit', 'delivered', 'cancelled', 'returned', 'refunded');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "PaymentStatusEnum_new" USING ("status"::text::"PaymentStatusEnum_new");
ALTER TYPE "PaymentStatusEnum" RENAME TO "PaymentStatusEnum_old";
ALTER TYPE "PaymentStatusEnum_new" RENAME TO "PaymentStatusEnum";
DROP TYPE "PaymentStatusEnum_old";
COMMIT;
