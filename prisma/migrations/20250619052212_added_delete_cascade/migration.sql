-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_board_id_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
