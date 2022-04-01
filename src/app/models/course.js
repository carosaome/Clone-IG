import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  id: ObjectId,
  name: String,
  desc: String,
  img: String,
  slug: {type:String, slug:"name", unique:true},
  idVideo:String,
},{
  timestamps: true, 
}
);

export default mongoose.model('Course', Course)