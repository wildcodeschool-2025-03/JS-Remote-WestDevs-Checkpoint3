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
      "select * from boat order by coord_y, coord_x",
    );
    return rows as Boat[];
  }

  async update(p0: number, boatToUpdate: Partial<Boat>) {
    if (!boatToUpdate.id) {
      throw new Error("Missing boat ID for update");
    }

    const { id, coord_x, coord_y } = boatToUpdate;

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
