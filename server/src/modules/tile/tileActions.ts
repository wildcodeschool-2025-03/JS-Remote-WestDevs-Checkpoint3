import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readAll();
    res.json(tile);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { type, has_treasure } = req.body;
    if (!type || !has_treasure) {
      res.status(403).json("The entries are not valid");
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
