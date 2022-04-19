import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
  id: ObjectId,
  title: String,
  imgUrl: String,
  slug: {type:String, slug:"title", unique:true},
  createdBy: {
     type : mongoose.Types.ObjectId,
     ref:'User'
  }
},{
  timestamps: true, 
}
);

export default mongoose.model('Post', Post)