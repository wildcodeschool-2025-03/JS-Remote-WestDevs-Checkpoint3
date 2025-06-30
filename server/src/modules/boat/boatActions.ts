import type { NextFunction, Request, Response } from "express";
import boatRepository from "./boatRepository";

const browse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { coord_x, coord_y } = req.body;

    const affectedRows = await boatRepository.update(id, { coord_x, coord_y });

    if (affectedRows === 0) {
      return res.status(404).send("Boat not found");
    }

    res.status(200).json({ message: "Boat updated" });
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
