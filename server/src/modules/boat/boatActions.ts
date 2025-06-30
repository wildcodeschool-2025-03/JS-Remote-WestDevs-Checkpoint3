import { Request, Response, NextFunction } from "express";
import boatRepository from "./boatRepository";


const browse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats); 
  } catch (err) {
    next(err); 
  }
};


const edit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, coord_x, coord_y } = req.body;

    
    if (
      typeof id !== "number" ||
      typeof coord_x !== "number" ||
      typeof coord_y !== "number"
    ) {
      res.status(400).json({
        message: "Invalid or missing boat ID or coordinates.",
      });
      return;
    }

    const affectedRows = await boatRepository.update({ id, coord_x, coord_y });

    if (affectedRows > 0) {
      res.sendStatus(204); 
    } else {
      res.status(404).json({
        message: "Boat not found or no changes made.",
      });
    }
  } catch (err) {
    next(err); 
  }
};

export default {
  browse,
  edit,
};
