import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;

  const x = Number(coord_x);
  const y = Number(coord_y);

  if (x < 0 || x > 11 || y < 0 || y > 5) {
    return res.status(422).json({ error: "Invalid tile coordinates" });
  }

  try {
    const tile = await tileRepository.readByCoordinates(x, y);

    if (tile.length > 0) {
      next();
    } else {
      res.status(422).json({ error: "Tile does not exist" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
