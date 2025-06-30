import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM boat ORDER BY coord_y, coord_x"
    );

    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    if (id === undefined || coord_x === undefined || coord_y === undefined) {
      throw new Error("Champs requis manquants pour la mise à jour du bateau.");
    }

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id]
    );

    return result.affectedRows || 0;
  }
}

export default new BoatRepository();
