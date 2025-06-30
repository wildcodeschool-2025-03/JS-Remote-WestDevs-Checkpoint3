import type { RequestHandler } from "express";

import boatRepository from "../boat/boatRepository";
import tileRepository from "../tile/tileRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    if (blackPearl == null) {
      throw new Error("We lost the Pearl !");
    }

    const updatedCoords = {
      coord_x: 1,
      coord_y: 1,
    };

    const treasureIsland = await tileRepository.getRandomIsland();

    const affectedBoats = await boatRepository.update(
      blackPearl.id,
      updatedCoords,
    );

    if (affectedBoats === 0) {
      res.sendStatus(404);
      return;
    }

    const affectedTiles = await tileRepository.hideTreasure(treasureIsland);

    if (affectedTiles === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export default {
  add,
};
