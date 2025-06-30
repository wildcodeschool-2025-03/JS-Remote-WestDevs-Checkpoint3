import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coordX, coordY } = req.body;

    const tile = await tileRepository.readByCoordinates(coordX, coordY);

    if (!tile) {
      res.status(422);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
