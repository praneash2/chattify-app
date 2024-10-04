/*
  Warnings:

  - You are about to drop the column `friendid` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendid_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "friendid",
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
