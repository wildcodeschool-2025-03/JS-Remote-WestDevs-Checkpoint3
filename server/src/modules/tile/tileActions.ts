import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const result = await tileRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;

    if (coord_x === undefined || coord_y === undefined) {
      res.sendStatus(422);
    } else {
      const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

      if (tile.length === 0) {
        res.sendStatus(422);
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
