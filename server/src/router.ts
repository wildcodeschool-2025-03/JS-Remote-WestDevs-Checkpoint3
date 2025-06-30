import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);
router.get("/api/tiles", tileActions.browse);

import gameActions from "./modules/game/gameActions";
import tileActions from "./modules/tile/tileActions";

router.post("/api/games", gameActions.add);

import validate from "./modules/tile/tileActions";

router.put("/api/boats/:id", tileActions.validate, boatActions.edit);

/* ************************************************************************* */

export default router;
