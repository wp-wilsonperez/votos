import mongoose from 'mongoose';
let CandidateSchema = new mongoose.Schema({
   name: {type: String, require: true},
   lastname: {type: String, require: true},
   document: {type: String, require: true},
   birthdate: {type: String, require: true},
   votes: {type: Number, require: true, default: 0},
   img_main: {type: String, require: true, default: "candidate.jpg"}
});
export default mongoose.model('Candidate', CandidateSchema)