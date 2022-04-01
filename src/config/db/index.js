import mongoose from 'mongoose';

async function connect(){
    try {
await mongoose.connect('mongodb://localhost:27017/express_JS');
        console.log('sucess');
    } catch (error) {
        console.log('fail');
        
    }
}


export {connect}