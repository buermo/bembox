import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  wordid :{ type: 'Number', required: true },
  name: { type: 'String', required: true }
});

export default mongoose.model('User', userSchema);
