import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
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
      return;
    }
    if (coord_x < 0 || coord_x > 11) {
      res.sendStatus(422);
      return;
    }
    if (coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }
    const coordinate = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (!coordinate) {
      res.sendStatus(422);
      return;
    }
    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

export default {
  browse,
  validate,
};
