const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Genre } = require("../models/initModels");
const { Op } = require("sequelize");

const getGenres = catchAsync(async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getGenres };
