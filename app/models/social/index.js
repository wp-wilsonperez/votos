import mongoose from 'mongoose';
let SocialSchema = new mongoose.Schema({
	username: {type: String, require: true},
	facebook_id: {type: String, require: true},
	date: {type: String, require: true, defult: "0000-00-00"},
	vote: {type: String, require: true, defult: "0000-00-00"}
});
export default mongoose.model('Social', SocialSchema)
