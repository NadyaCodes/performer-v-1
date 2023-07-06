/*
  Warnings:

  - Added the required column `string` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Example" ADD COLUMN     "string" TEXT NOT NULL;
