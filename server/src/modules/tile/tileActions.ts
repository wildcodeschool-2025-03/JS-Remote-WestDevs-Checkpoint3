import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  const tiles = await tileRepository.readAll();

  res.json(tiles);
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;

    if (!coord_x || !coord_y) {
      res.sendStatus(422);
    }

    if (coord_x > 0 || coord_x <= 11 || coord_y > 0 || coord_y <= 5) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {}
};

export default {
  browse,
  validate,
};
