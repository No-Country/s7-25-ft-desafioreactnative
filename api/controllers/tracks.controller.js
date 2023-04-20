const {
  saveFileToFirebase,
} = require("../firebase/functions/saveFileToFirebase");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const {
  User,
  Track,
  Genre,
  Purchase,
  FavoriteTrack,
} = require("../models/initModels");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { db } = require("../utils/database.util");
const { formatDuration, getMetadata } = require("../utils/metadata.util");
const env = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uploadTrack = catchAsync(async (req, res, next) => {
  try {
    const { originalname, buffer } = req.files.audio[0];
    const { user_id, price, genres } = JSON.parse(req.body.trackData);

    const uuid = uuidv4();

    const [audioResponse, imageResponse, user, genresToAdd, audioDuration] =
      await Promise.all([
        saveFileToFirebase({ uuid, ...req.files.audio[0] }),
        req.files.image
          ? saveFileToFirebase({ uuid, ...req.files.image[0] })
          : undefined,
        User.findByPk(user_id),
        Genre.findAll({
          where: {
            name: {
              [Op.in]: Array.isArray(genres) ? genres : [],
            },
          },
        }),
        formatDuration(buffer),
      ]);

    const track = await Track.create({
      id: uuid,
      artist: user.userName,
      title: originalname.slice(0, -4),
      url: audioResponse,
      artwork: imageResponse,
      price,
      duration: audioDuration,
    });

    await Promise.all([user.addTrack(track), track.addGenres(genresToAdd)]);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

const getTracks = catchAsync(async (req, res, next) => {
  try {
    const {
      page,
      searchByTitle,
      searchByArtist,
      sortBy,
      sortDirection,
      genres = [],
    } = req.query;

    const { userId } = req.params;

    const pageSize = 10;

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const filter = searchByTitle
      ? {
          title: {
            [Op.iLike]: `%${searchByTitle}%`,
          },
        }
      : {};

    let order = [["createdAt", sortDirection || "DESC"]];
    if (sortBy === "price" || sortBy === "title") {
      order = [[sortBy, sortDirection || "ASC"]];
    } else if (
      sortBy === "sales_accountant" ||
      sortBy === "favorites_counter"
    ) {
      order = [[sortBy, sortDirection || "DESC"]];
    }

    let tracks = await Track.findAll({
      where: filter,
      include: [
        {
          model: Genre,
          as: "genres",
          attributes: [],
          where:
            genres.length > 0 && Array.isArray(genres)
              ? {
                  name: {
                    [Op.in]: genres,
                  },
                }
              : {},
        },
        {
          model: User,
          as: "artist",
          attributes: ["userName", "email"],
          where: searchByArtist
            ? {
                userName: {
                  [Op.iLike]: `%${searchByArtist}%`,
                },
              }
            : {},
        },
      ],
      offset,
      limit,
      order,
    });

    tracks = await Promise.all(
      tracks.map(async (track) =>
        Track.findByPk(track.id, {
          include: [
            {
              model: Genre,
              as: "genres",
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: User,
              as: "artist",
              attributes: ["userName", "email"],
            },
            {
              model: User,
              as: "favoritedBy",
              attributes: ["id"],
            },
            {
              model: User,
              as: "purchasedBy",
              attributes: ["id"],
            },
          ],
        })
      )
    );

    const count = await Track.findAndCountAll({
      where: filter,
      distinct: true,
      include: [
        {
          model: Genre,
          as: "genres",
          attributes: ["name"],
          where:
            genres.length > 0 && Array.isArray(genres)
              ? {
                  name: {
                    [Op.in]: genres,
                  },
                }
              : {},
        },
        {
          model: User,
          as: "artist",
          attributes: ["userName", "email"],
          where: searchByArtist
            ? {
                userName: {
                  [Op.iLike]: `%${searchByArtist}%`,
                },
              }
            : {},
        },
      ],
    });

    const totalTracks = count.count;
    const totalPages = Math.ceil(totalTracks / pageSize);
    const remainingPages = totalPages - page;

    tracks = tracks.map((track) => {
      let trackObj = track.toJSON();

      const reduceFavorites = trackObj.favoritedBy.reduce(
        (acc, current) => acc || current.id === userId,
        false
      );
      const reducePurchase = trackObj.purchasedBy.reduce(
        (acc, current) => acc || current.id === userId,
        false
      );

      return {
        ...trackObj,
        favoritedBy: reduceFavorites,
        purchasedBy: reducePurchase,
      };
    });

    res.status(200).json({
      status: "success",
      data: {
        tracks,
        pagination: {
          pageSize,
          page,
          remainingPages,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const uploadTracksTest = catchAsync(async (req, res, next) => {
  try {
    const { tracksData, user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) throw new Error("User not found");

    // Crear las pistas y asociarlas al usuario
    const createdTracks = await Promise.all(
      tracksData.map(async (trackData) => {
        const { title, price, genres, duration, artwork, url } = trackData;

        const track = await Track.create({
          title: title.slice(0, -4),
          url,
          artwork,
          price,
          duration,
        });

        const genresToAdd = await Genre.findAll({
          where: {
            name: {
              [Op.in]: Array.isArray(genres) ? genres : [],
            },
          },
        });

        await Promise.all([user.addTrack(track), track.addGenres(genresToAdd)]);

        return track;
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        tracks: createdTracks,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

const makePayment = catchAsync(async (req, res, next) => {
  const { amount, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount,
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
    });

    res.status(200).json({ status: "success", paymentIntent });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

const completePurchase = catchAsync(async (req, res, next) => {
  const { userId, trackId } = req.body;

  try {
    const [user, track] = await Promise.all([
      User.findByPk(userId),
      Track.findByPk(trackId),
    ]);

    if (!user || !track) {
      return res.status(404).json({ error: "User or track not found" });
    }

    if (user.id === track.user_id) {
      return res
        .status(400)
        .json({ error: "The user is the owner of the track" });
    }

    const purchase = await Purchase.create({
      userId: user.id,
      trackId: track.id,
    });

    await track.increment("sales_accountant");

    return res
      .status(200)
      .json({ status: "success", message: "Successful purchase" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
});

const addToFavorite = catchAsync(async (req, res, next) => {
  const { userId, trackId } = req.body;

  try {
    const [user, track] = await Promise.all([
      User.findByPk(userId),
      Track.findByPk(trackId),
    ]);

    if (!user || !track) {
      return res.status(404).json({ error: "User or track not found" });
    }

    if (user.id === track.user_id) {
      return res
        .status(400)
        .json({ error: "The user is the owner of the track" });
    }

    const favorite = await FavoriteTrack.create({
      userId: user.id,
      trackId: track.id,
    });

    await track.increment("favorites_counter");

    return res.status(200).json({
      status: "success",
      message: "Track added to favorites successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
});

const removeFavorite = catchAsync(async (req, res, next) => {
  const { userId, trackId } = req.body;

  try {
    const deleted = await FavoriteTrack.destroy({
      where: {
        userId,
        trackId,
      },
    });

    if (deleted === 1) {
      const track = await Track.findByPk(trackId);

      await track.decrement("favorites_counter");

      return res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
});

const getUserTracks = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const limit = req.query.limit || 10;
  const type = req.query.type;

  if (type !== "owner" && type !== "favorite" && type !== "buy") {
    return res.status(200).json({
      status: "error",
      message: "Invalid type",
    });
  }

  try {
    let tracks = await Track.findAll({
      where:
        type === "owner"
          ? {
              user_id: userId,
            }
          : {},
      include:
        type === "owner"
          ? [
              {
                model: User,
                attributes: ["userName", "email"],
                as: "artist",
              },
              {
                model: User,
                as: "favoritedBy",
                attributes: ["id"],
              },
              {
                model: User,
                as: "purchasedBy",
                attributes: ["id"],
              },
            ]
          : [
              {
                model: User,
                where: type === "buy" ? { id: userId } : {},
                as: "purchasedBy",
              },
              {
                model: User,
                where: type !== "buy" ? { id: userId } : {},
                as: "favoritedBy",
              },
              {
                model: User,
                attributes: ["userName", "email"],
                as: "artist",
              },
            ],
      limit,
      order: [["createdAt", "ASC"]],
    });

    const total = await Track.count({
      where:
        type === "owner"
          ? {
              user_id: userId,
            }
          : {},
      include:
        type === "owner"
          ? []
          : [
              {
                model: User,
                where: { id: userId },
                attributes: [],
                as: type === "buy" ? "purchasedBy" : "favoritedBy",
              },
            ],
    });

    tracks = tracks.map((track) => {
      let trackObj = track.toJSON();
      let reduceFavorites = true;
      let reducePurchase = true;

      if (type === "owner") {
        reduceFavorites = trackObj.favoritedBy.reduce(
          (acc, current) => acc || current.id === userId,
          false
        );
        reducePurchase = trackObj.purchasedBy.reduce(
          (acc, current) => acc || current.id === userId,
          false
        );
      } else if (type === "buy"){
        reduceFavorites = trackObj.favoritedBy.reduce(
          (acc, current) => acc || current.id === userId,
          false
        );
      } else if (type === "favorite"){
        reducePurchase = trackObj.purchasedBy.reduce(
          (acc, current) => acc || current.id === userId,
          false
        );
      }

      return {
        ...trackObj,
        favoritedBy: reduceFavorites,
        purchasedBy: reducePurchase,
      };
    });

    return res.status(200).json({
      status: "success",
      tracks,
      limit: total <= parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error,
    });
  }
});

module.exports = {
  uploadTrack,
  getTracks,
  uploadTracksTest,
  makePayment,
  completePurchase,
  addToFavorite,
  removeFavorite,
  getUserTracks,
};
