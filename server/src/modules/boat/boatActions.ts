import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const editBoat = await boatRepository.update(req.params);
    if (editBoat) {
      res.status(204).json("Boat is succefully edited");
    } else {
      res.status(404).json("impossible to edit boat");
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

export default {
  browse,
  edit,
};
