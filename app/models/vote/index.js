import mongoose from 'mongoose';
let VoteSchema = new mongoose.Schema({
   user_id: {type: String, require: true},
   votes: [
      {candidate_id: String, fullname: String, kind: Number, pointsO: Number, pointsC: Number, pointsG: Number, pointsQ: Number}
   ]
});
export default mongoose.model('Vote', VoteSchema)