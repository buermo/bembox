import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questSchema = new Schema({
  name: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  startDate: { type: 'Date' },
  endDate: { type: 'Date' },
  attendance: [String]
});

export default mongoose.model('Quest', questSchema);
