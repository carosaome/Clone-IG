import mongoose from "mongoose";
import slug from  "mongoose-slug-generator"

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Converstation = new Schema({
  id: ObjectId,
  member: [{  
      type : mongoose.Types.ObjectId,
      ref:'User'
    }, {  
      type : mongoose.Types.ObjectId,
      ref:'User'
    }]
},{
  timestamps: true, 
}
);

export default mongoose.model('Converstation', Converstation)