import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Tile = {
  id: number;
  type: string;
  coord_x: number;
  coord_y: number;
  has_treasure: boolean;
};

class TileRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all tiles from the "tile" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM tile ORDER BY coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Tile[];
  }

  async readByCoordinates(coordX: number, coordY: number) {
    const [rows] = await databaseClient.query<Rows[]>(
      "SELECT * FROM tile WHERE coord_x = ? and coord_y = ?",
      [coordX, coordY],
    );
    return rows;
  }

  async getRandomIsland() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM tile WHERE type='island' ORDER BY rand() LIMIT 1",
    );

    return rows[0] as Tile;
  }

  async hideTreasure(island: Tile) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE tile SET has_treasure =
        CASE
          WHEN id = ? THEN true
          ELSE false
        END`,
      [island.id],
    );

    return result.affectedRows;
  }
}

export default new TileRepository();
