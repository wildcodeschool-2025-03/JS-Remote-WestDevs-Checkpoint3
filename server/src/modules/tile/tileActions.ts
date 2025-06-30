import type { RequestHandler } from "express";
import databaseClient from "../../../database/client";
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
  // const { coord_x, coord_y } = req.body;
  // const coordinate = await tileRepository.readByCoordinates(coord_x, coord_y);
  // if (!coord_x || coord_y) {
  //   res.sendStatus(422);
  // } else {
  //   next();
  // }
};

export default {
  browse,
  validate,
};
