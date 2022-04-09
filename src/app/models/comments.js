import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  id: ObjectId,
  postId: { type : mongoose.Types.ObjectId},
  content: String,
  createdBy: { type : mongoose.Types.ObjectId}
},{
  timestamps: true, 
}
);

export default mongoose.model('Comment', Comment)