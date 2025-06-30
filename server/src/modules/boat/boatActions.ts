import type { RequestHandler } from "express";
import { useParams } from "react-router";
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
  // your code here
  try {
    const boats_id = Number(req.params.id);
    const affectedRows = await boatRepository.editUpdate(boats_id);

    if (affectedRows == null) {
      res.sendStatus(404).json("There is a mistake 😳");
    } else {
      res.json(affectedRows);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
