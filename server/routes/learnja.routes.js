import { Router } from 'express';
import * as LeanJaController from '../controllers/learnja.controller';
const router = new Router();

// Get all Posts
router.route('/learnja').get(LeanJaController.getNextBatch);

export default router;
