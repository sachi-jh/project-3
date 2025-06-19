const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const boards = [
    {title:"Happy Birthday Bestie", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWE4MHczbzJxNWVnMGR1ZDlmOXludzl5ZTBycXp5cXd6NzVvYnNkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wjK3YnjoQf0go/giphy.gif"}]},
    {title:"hi", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NDljZ2ZwbDIwNjcyenk0dWJ6MzFta3JtOWo5MHA3ZHprNzYyNDF3ZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/krI1lBPsluByg/giphy.gif"}]},
    {title:"Inspiration", category:"Inspiration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHgzM3hrMGV2dWM2NG9xaTNpc3BjejY2Y282YjIzMGptNHVjMHdzcSZlcD12MV9naWZzX3RyZW5kaW5nJnRpZD1lMGM3NGEyZmE4NjJkZjM0OTYzOWZiOWE3ZTc5MWJlZmVlNTJmM2MzNDg5YjU1ZTA3MzgxNGYwYjZkYmE1Y2I4JmN0PWcmYXA9MQ/bO7ng3JjXo4JeVL5En/giphy.gif"}]},
    {title:"Congrats", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media.giphy.com/media/v1.Y2lkPTgyYTE0OTNidmJiend5aW9meTYwNTlpeXRuNXBpZDBoZDhmOHRnNHBqcjVrYXE0OSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/F99PZtJC8Hxm0/giphy.gif0"}]},
    {title:"Great Job Interns", category:"Celebration", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3RzZ3huMzRweXp1dWxhY3BmYzI5ejNkdG10ZnY2azVxc3RrODN2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uUs14eCA2SBgs/giphy.gif0"}]},
    {title:"Thank you Program Instructors", category:"Thank You", image_url:"https://picsum.photos/200/300", cards:[{title:"Happy Birthday", text:"You live to see another year", image_url:"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d3d6ZHV1cmx1amJkajRvYmYzenlsd3l4MmZub3Q2MHg2dmR4b2VvdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5A9hCjG2hZiwzY1Anv/giphy.gif"}]},
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
