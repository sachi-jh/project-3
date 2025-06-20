const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async fetchAll(search = {}) {
        const boards = await prisma.board.findMany({where: {
            ...(search.category && { category: search.category }),
            ...(search.search && {
              title: {
                contains: search.search,
                mode: 'insensitive',
              }
            }),
          }});
        return boards;
    },

    async fetchOne(id) {
        const board = await prisma.board.findUnique({where: {id: id},  include: {cards: true}});
        return board;
    },

    async create(data){
        const newBoard = await prisma.board.create({data: data});
        return newBoard;
    },

    async delete(id){
        const deletedBoard = await prisma.board.delete({where: {id: id}});
        return deletedBoard;
    },

    async fetchOneCard(id){
        const card = await prisma.card.findUnique({where: {id: id}, include: {comments: true}});
        return card;
    },

    async createCard(data){
        const newCard = await prisma.card.create({
            data: {
              title: data.title,
              text: data.text,
              image_url: data.image_url,
              author: data.author,
              board: {
                connect: { id: Number(data.board_id) }
              }
            }
          });
        return newCard;
    },

    async deleteCard(id) {
        const deletedCard = await prisma.card.delete({where: {id: id}});
        return deletedCard;
    },

    async updateCardUpvote(id) {
        const updatedCard = await prisma.card.update({where: {id: id}, data: {upvotes: { increment: 1 }}});
        return updatedCard;
    },
    async updateCardPin (id) {
      const card = await prisma.card.findUnique({where: {id: id}});
      const updatedCard = await prisma.card.update({where: {id: id}, data: {isPinned: { set: !card.isPinned }, pinnedAt: card.isPinned ? null : new Date()}});
      return updatedCard;
    },
    async createComment (data) {
      const newComment = await prisma.comment.create({
        data: {
          text: data.text,
          author: data.author,
          card: {
            connect: { id: Number(data.card_id) }
          }
        }
      });
      return newComment;
    }
}
