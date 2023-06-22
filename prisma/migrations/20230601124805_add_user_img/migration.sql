/*
  Warnings:

  - You are about to drop the column `profile_img_num` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `profile_img_num` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `profile_img_num`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profile_img_num` INTEGER NOT NULL;
