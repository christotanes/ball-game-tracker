import express from 'express';
import matchController from '../controller/match.js';
const router = express.Router();

router.get("/", matchController);

export default router