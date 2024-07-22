/*
  Warnings:

  - The primary key for the `Password` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Password" DROP CONSTRAINT "Password_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Password_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Password_id_seq";
