import { Router } from 'express';
import * as QuestController from '../controllers/quest.controller';
const router = new Router();

// Get all Posts
router.route('/quests').get(QuestController.getTodayQuests);

// Get one post by cuid
router.route('/quests/:cuid').get(QuestController.markQuestAttendance);

// Add a new Post
router.route('/quests').post(QuestController.addQuest);

// Delete a post by cuid
router.route('/quests/:cuid').delete(QuestController.deleteQuest);

export default router;
