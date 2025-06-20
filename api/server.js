const express = require("express");
const cors = require("cors");
const Boards = require("./kudos-model");
const helmet = require("helmet");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

//fetch all boards, or by category, or by search for title
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

//fetch a single board by id along with cards
server.get("/boards/:board_id", async (req, res, next) => {
    const id = parseInt(req.params.board_id)
    try {
        const board = await Boards.fetchOne(id);
        if (board) {
          res.json(board);
        } else {
          next({ message: "No boards match the search criteria", status: 404 });
        }
      } catch (err) {
        next(err);
      }
})

//create a new board
server.post("/boards", async (req, res, next) => {
    const newBoard = req.body;
  try {
    const newBoardValid = (
      newBoard.title !== undefined &&
      newBoard.category !== undefined &&
      newBoard.image_url !== undefined
    )
    if (newBoardValid) {
      const created = await Boards.create(newBoard);
      res.status(201).json(created);
    } else {
      next({ status: 422, message: 'title, category, and image are required' });
    }
  } catch (err) {
    next(err);
  }
})

//delete a board
server.delete("/boards/:id", async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const board = await Boards.fetchOne(id)
        if (board) {
            const deleted = await Boards.delete(id)
            res.json(deleted)
        } else {
            next({ status: 404, message: 'board not found' })
        }
    } catch (err) {
        next(err)
    }
})

//delete a card by id
server.delete("/boards/cards/:card_id", async (req, res, next) => {
    const card_id = parseInt(req.params.card_id)
    try {
        const card = await Boards.fetchOneCard(card_id)
        if (card) {
            const deleted = await Boards.deleteCard(card_id)
            res.json(deleted)
        } else {
            next({ status: 404, message: 'card not found' })
        }
    } catch (err) {
        next(err)
    }
})

//create a new card on a board
server.post("/boards/cards", async (req, res, next) => {
  const newCard = req.body
  try {
    const newCardValid = (
        newCard.title !== undefined &&
        newCard.text !== undefined &&
        newCard.image_url !== undefined &&
        newCard.board_id !== undefined &&
        newCard.author !== undefined
    )
    if (newCardValid) {
      const created = await Boards.createCard(newCard);
      res.status(201).json(created);
    } else {
      next({ status: 422, message: 'title, category, and image are required' });
    }
  } catch (err) {
    next(err);
  }
})

//edit upvotes on a card
//changed to increment upvotes
server.put("/boards/cards/:card_id/upvote", async (req, res, next) => {
    const id = parseInt(req.params.card_id)
    try {
        const card = await Boards.fetchOneCard(id)
        if (card) {
            const updated = await Boards.updateCardUpvote(id);
            res.status(201).json(updated);
        } else {
            next({ status: 422, message: 'title, category, and image are required' });
        }
    } catch (err) {
        next(err)
    }
})

//get a card by id including comments
server.get("/cards/:card_id", async (req, res, next) => {
    const id = parseInt(req.params.card_id)
    try {
        const card = await Boards.fetchOneCard(id);
        console.log(card)
        if (card) {
          res.json(card);
        } else {
          next({ message: "No cards match the search criteria", status: 404 });
        }
      } catch (err) {
        next(err);
      }
})

//toggle pins
server.put("/cards/:card_id/pin", async (req, res, next) => {
    const id = parseInt(req.params.card_id)
    try {
      const card = await Boards.fetchOneCard(id)
      if (card) {
          const updated = await Boards.updateCardPin(id);
          res.status(201).json(updated);
      } else {
          next({ status: 422, message: 'title, category, and image are required' });
      }
  } catch (err) {
      next(err)
  }
})

//create new comment on a card
server.post("/cards/comments", async (req, res, next) => {
  const newComment = req.body
  try {
    const newCommentValid = (
      newComment.text !== undefined &&
      newComment.card_id !== undefined &&
      newComment.author !== undefined
    )
    if (newCommentValid) {
      const created = await Boards.createComment(newComment);
      res.status(201).json(created);
    } else {
      next({ status: 422, message: 'title, category, and image are required' });
    }
  } catch (err) {
    next(err);
  }

})

//error handling middleware
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
