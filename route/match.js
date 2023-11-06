import express from 'express';
import matchController from '../controller/match.js';
import { getMatchByGameId } from '../controller/match.js';
const router = express.Router();

router.get("/", matchController);
router.get("/:awayTeam-vs-:homeTeam-:id", getMatchByGameId)
export default router