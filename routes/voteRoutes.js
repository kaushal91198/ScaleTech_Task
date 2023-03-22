const express = require("express");
const Router = express.Router();
const voteController = require("../controller/voteController");
const {  check } = require("express-validator");

//Route 1-> Adding vote to option
Router.post(
  "/",
  [
    check("user_id").
      isMongoId()
      .withMessage("Invalid payload"),
    check("option_id").
      isMongoId()
      .withMessage("Invalid payload"),
    check("star")
      .notEmpty().isInt({ min: 1, max: 5 })
      .withMessage("You can't vote more than five or less than one stars"),
  ],
  voteController().addVote
);

Router.get(
  "/",
  voteController().listOption
);





module.exports = Router;
