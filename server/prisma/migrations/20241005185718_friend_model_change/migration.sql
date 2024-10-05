/*
  Warnings:

  - A unique constraint covering the columns `[userid,friendid]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendid` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "friendid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userid_friendid_key" ON "Friend"("userid", "friendid");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendid_fkey" FOREIGN KEY ("friendid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
