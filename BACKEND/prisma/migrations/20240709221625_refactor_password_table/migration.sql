/*
  Warnings:

  - You are about to drop the column `email` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Password_email_key";

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordExpires",
DROP COLUMN "resetPasswordToken";

-- CreateIndex
CREATE UNIQUE INDEX "Password_user_id_key" ON "Password"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Password_resetPasswordToken_key" ON "Password"("resetPasswordToken");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
