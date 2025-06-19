const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const boards = [
    {title:"Happy Birthday Bestie", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},
    {title:"hi", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},
    {title:"Inspiration", category:"Inspiration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},
    {title:"Congrats", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},
    {title:"Great Job Interns", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},
    {title:"Thank you Program Instructors", category:"Thank You", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://picsum.photos/200/300"}]},

  ]

  for (const board of boards) {
    await prisma.board.create({
      data: {
        title: board.title,
        category: board.category,
        image_url: board.image_url,
        cards: {
          create: board.cards
        }
      }
    });
  }

  console.log("Seeded kudos boards!");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
