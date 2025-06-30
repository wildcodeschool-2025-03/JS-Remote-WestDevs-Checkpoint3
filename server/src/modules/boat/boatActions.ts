import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { coord_x, coord_y } = req.body;

    if (!id || coord_x == null || coord_y == null) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    await boatRepository.update({ id, coord_x, coord_y });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
