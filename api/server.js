const express = require("express");
const cors = require("cors");
const Boards = require("./kudos-model");
const helmet = require("helmet");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/boards", async (req, res, next) => {
    const { category, search } = req.query;
  try {
    const boards = await Boards.fetchAll({category, search});
    if (boards.length) {
      res.json(boards);
    } else {
      next({ message: "No boards match the search criteria", status: 404 });
    }
  } catch (err) {
    next(err);
  }
});

server.post("/boards", async (req, res, next) => {
    const newBoard = req.body
  try {
    // Validate that newPet has all the required fields
    const newBoardValid = (
      newBoard.title !== undefined &&
      newBoard.category !== undefined &&
      newBoard.image_url !== undefined
    )
    if (newBoardValid) {
      const created = await Boards.create(newBoard)
      res.status(201).json(created)
    } else {
      next({ status: 422, message: 'title, category, and image are required' })
    }
  } catch (err) {
    next(err)
  }
})

server.post("/boards/:id", async (req, res, next) => {
    const id =  parseInt(req.params.id)
    const newCard = req.body
  try {
    const newCardValid = (
        newCard.title !== undefined &&
        newCard.text !== undefined &&
        newCard.image_url !== undefined
    )
    if (newCardValid) {
      const created = await Boards.createCard(newCard, id)
      res.status(201).json(created)
    } else {
      next({ status: 422, message: 'title, category, and image are required' })
    }
  } catch (err) {
    next(err)
  }
})

server.use((req, res, next) => {
    next({ status: 404, message: "Not found" });
  });

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  console.log(message);
  res.status(status).json({ message }); // Unsafe in prod
});

module.exports = server;
