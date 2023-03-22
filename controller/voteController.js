const userModel = require("../models/User");
const optionModel = require("../models/Option");
const optionVoteModel = require("../models/OptionVote");
const { validationResult } = require("express-validator");
const voteController = () => {
  return {
    addVote: async (req, res) => {
      try {
        //Checking validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(409).json(
            {
              success: false,
              message: errors.array()
            });
        }
        const { user_id, option_id, star } = req.body
        const findOptionId = await optionModel.findById(option_id, '_id')
        const findUserId = await userModel.findById(user_id, 'allowedStar')
        if (!findUserId || !findOptionId) {
          return res.status(409).json({
            success: false,
            message: "Invalid payload"
          })
        }
        // //Checking user has star to vote or not
        if (findUserId.allowedStar == 0 || findUserId.allowedStar < star) {
          return res.status(409).json({
            success: false,
            message: findUserId.allowedStar !== 0 ? `Your have only ${findUserId.allowedStar} star for voting` : "You don't have the star for voting",
            maxStar: findUserId.allowedStar
          })
        }
        let userVoteToOption = {
          userId: user_id,
          star
        }
        //Checking any users has voted or not before
        const findOption = await optionVoteModel.findOne({
          optionId: option_id,
        }, 'optionId userVote')
        //If any users has voted
        if (findOption) {
          let findUserIndex = findOption.userVote.findIndex((userIndex) => {
            return userIndex.userId == user_id
          })
          // if one users is supposed to vote second time for same option then incrementing the star in existing documents
          if (findUserIndex !== -1) {
            await optionVoteModel.findOneAndUpdate(
              {
                optionId: option_id, "userVote.userId": user_id
              },
              {
                $inc: {
                  'userVote.$[].star': star,
                }
              },
            );
          }
          // if one users is supposed to vote second time for differnt option then pushing object in existing documents
          else {
            await optionVoteModel.findOneAndUpdate(
              { optionId: option_id, },
              { $push: { userVote: userVoteToOption } },
            );
          }
        }
        //If no users has voted yet then creating the document 
        else {
          await optionVoteModel.create({
            optionId: option_id,
            userVote: [userVoteToOption]
          });
        }
        const userStar = await userModel.findOneAndUpdate(
          { _id: user_id, },
          { $inc: { 'allowedStar': -star } }, {
          new: true
        });
        return res.status(200).json({
          success: true,
          message: "You voted successfully.",
          maxStar: userStar.allowedStar
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        })
      }

    },
    listOption: async (req, res) => {
      try {
        //Query to calculate percentage and total star
        const optionStar = await optionVoteModel.aggregate([
          {
            "$lookup": {
              "from": "options",
              "localField": "optionId",
              "foreignField": "_id",
              "as": "option_name"
            }
          },
          {
            $group: {
              _id: { option_detail: "$option_name" },
              "stars": {
                "$sum": { "$sum": "$userVote.star" }
              }
            }
          },
        ])
        if (optionStar.length) {
          //Calculating the total stars
          const totalStars = optionStar.reduce((sum, option) => sum + option.stars, 0);
          // Calculate the percentage for each option and Rank the options by the number of stars spent 
          const rankedOptions = optionStar.sort((a, b) => b.stars - a.stars).map((option, index) => ({
            name: option._id.option_detail[0].name,
            percentage: parseFloat(((option.stars / totalStars) * 100).toFixed(3)),
            stars: option.stars,
            position: index + 1,
          }));
          return res.status(200).json({
            success: true,
            totalStars,
            rankedOptions,
          })
        }
        else {
          return res.status(409).json({
            success: false,
            message: "No user has voted to any option yet "
          })
        }

      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        })
      }

    },
  };
};

module.exports = voteController;









