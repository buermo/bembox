import Quest from '../models/quest';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get today's quests
 * @param req
 * @param res
 * @returns void
 */
export function getTodayQuests(req, res) {
  Quest.find({
    $and: [
      { $or: [{startDate: {$exists: false}}, {startDate: {$lt: new Date()}}] },
      { $or: [{endDate: {$exists: false}}, {endDate: {$gt: new Date()}}] }
    ]}).exec((err, quests) => {
      console.log('getTodayQuests - quests:' + quests);
    if (err) {
      res.status(500).send(err);
    }
    res.json({ quests });
  });
}

/**
 * Save a quest
 * @param req
 * @param res
 * @returns void
 */
export function addQuest(req, res) {
  if (!req.body.quest) {
    res.status(403).end();
  }

  const newQuest = new Quest(req.body.quest);

  // Let's sanitize inputs
  newQuest.name = sanitizeHtml(newQuest.name);

  newQuest.slug = slug(newQuest.title.toLowerCase(), { lowercase: true });
  newQuest.cuid = cuid();
  newQuest.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ quest: saved });
  });
}

/**
 * Mark attendance for a quest
 * @param req
 * @param res
 * @returns void
 */
export function markQuestAttendance(req, res) {
  console.log('req:'+req);
  Quest.findOne({ cuid: req.params.cuid }).exec((err, quest) => {
    console.log('quest:'+quest);
    if (err || !quest) {
      res.status(500).send(err);
    }

    var todayString = new Date().toLocaleDateString();
    if (quest != null && !quest.attendance) {
      quest.attendance = [];
      quest.attendance.push(todayString);
    }
    else if(!quest.attendance.includes(todayString))
      quest.attendance.push(todayString);

    res.json({ quest: true });
  });
}

/**
 * Delete a quest
 * @param req
 * @param res
 * @returns void
 */
export function deleteQuest(req, res) {
  Quest.findOne({ cuid: req.params.cuid }).exec((err, quest) => {
    if (err) {
      res.status(500).send(err);
    }

    quest.remove(() => {
      res.status(200).end();
    });
  });
}
