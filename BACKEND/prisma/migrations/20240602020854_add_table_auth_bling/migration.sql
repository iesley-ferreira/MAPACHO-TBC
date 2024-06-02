/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "AuthBling" (
    "id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "token_type" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthBling_pkey" PRIMARY KEY ("id")
);
