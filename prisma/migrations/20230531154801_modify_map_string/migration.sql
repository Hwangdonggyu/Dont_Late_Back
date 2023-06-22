/*
  Warnings:

  - You are about to drop the column `explain` on the `Map` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Map` DROP COLUMN `explain`,
    MODIFY `pri_pub_div` VARCHAR(100) NOT NULL,
    MODIFY `in_out_div` VARCHAR(100) NOT NULL;
