import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  id: ObjectId,
  email: String ,
  password: String,
},{
  timestamps: true, 
}
);

export default mongoose.model('User', User)