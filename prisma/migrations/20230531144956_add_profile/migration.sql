/*
  Warnings:

  - Added the required column `profile_img_num` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `profile_img_num` INTEGER NOT NULL;
