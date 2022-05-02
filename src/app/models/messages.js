import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Message = new Schema({
  id: ObjectId,
  content: String,
  converstationId: {
    type : mongoose.Types.ObjectId,
    ref:'Converstation'
 },
  createdBy: {
     type : mongoose.Types.ObjectId,
     ref:'User'
  }
},{
  timestamps: true, 
}
);

export default mongoose.model('Message', Message)