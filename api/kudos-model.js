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
          }, include: {cards: true}});
        return boards;
    },

    async fetchOne(id) {
        const board = await prisma.board.findUnique({where: {id: id}});
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

    async createCard(data, id){
        const newCard = await prisma.card.create({
            data: {
              title: data.title,
              text: data.text,
              image_url: data.image_url,
              board: {
                connect: { id: Number(id) }
              }
            }
          });
        return newCard;
    },
}
