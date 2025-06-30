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
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      `
    SELECT 
      boat.id AS id,
      boat.name,
      boat.coord_x,
      boat.coord_y,
      tile.id AS tile_id,
      tile.type,
      tile.coord_x,
      tile.coord_y,
      tile.has_treasure
    FROM boat
    JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
    `,
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    const [result] = await databaseClient.query<Result>(
      `UPDATE boat
      SET coord_x = ?, coord_y = ?
      WHERE id = ?`,
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
