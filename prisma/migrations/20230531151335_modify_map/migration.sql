/*
  Warnings:

  - You are about to drop the column `user_id` on the `Map` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Map` DROP FOREIGN KEY `Map_user_id_fkey`;

-- AlterTable
ALTER TABLE `Map` DROP COLUMN `user_id`;
