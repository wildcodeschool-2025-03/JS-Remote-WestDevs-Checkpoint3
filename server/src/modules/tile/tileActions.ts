import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.status(200).json(tiles);
  } catch (err) {
    res.sendStatus(500);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;

    const isCoordsValid = await tileRepository.readByCoordinates(
      coord_x,
      coord_y,
    );

    if (isCoordsValid.length) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
