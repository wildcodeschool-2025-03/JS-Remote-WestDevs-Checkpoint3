import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

interface Boat {
  name: string;
}

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats: Boat[] = await boatRepository.readAll();

    const response = await fetch("http://localhost:3310/api/boat", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(boats),
    });

    if (!response.ok) {
      console.error("Failed to send boats to /api/boat");
    }

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Appelle une méthode pour mettre à jour un bateau
    const result = await boatRepository.update({
      id: +req.params.id,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    });

    // Si mise à jour réussie
    if (result > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json("This boat doesn't exist");
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
