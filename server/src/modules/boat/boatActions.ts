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
  const id = Number(req.params.id);
  const { coord_x, coord_y } = req.body;

  try {
    const affectedRows = await boatRepository.update({ id, coord_x, coord_y });

    if (affectedRows === 0) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
