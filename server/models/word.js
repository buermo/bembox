import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  id :{ type: 'Number', required: true },
  kanji: { type: 'String', required: true },
  kana: { type: 'String', required: true },
  meaning: { type: 'String', required: true },
  options: [String]
});

export default mongoose.model('Word', wordSchema);
