import Word from '../models/word';
/**
 * Get today's quests
 * @param req
 * @param res
 * @returns void
 */
export function getNextBatch(req, res) {
  Word.find({
    $and: [
      { id: {$gt: 0} },
      { id: {$lt: 10} }
    ]}).exec((err, words) => {
      console.log('getNextBatch - words:' + words);
    if (err) {
      res.status(500).send(err);
    }
    res.json({ words });
  });
}
