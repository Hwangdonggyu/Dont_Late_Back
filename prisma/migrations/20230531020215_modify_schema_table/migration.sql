/*
  Warnings:

  - Added the required column `map_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `map_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_map_id_fkey` FOREIGN KEY (`map_id`) REFERENCES `Map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
