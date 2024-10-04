/*
  Warnings:

  - Added the required column `friendid` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_id_fkey";

-- AlterTable
CREATE SEQUENCE friend_id_seq;
ALTER TABLE "Friend" ADD COLUMN     "friendid" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('friend_id_seq');
ALTER SEQUENCE friend_id_seq OWNED BY "Friend"."id";

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendid_fkey" FOREIGN KEY ("friendid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
