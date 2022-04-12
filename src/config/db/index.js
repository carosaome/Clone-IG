import mongoose from 'mongoose';

async function connect(){
    try {
await mongoose.connect(process.env.MONGODB_URI);
        console.log('sucess');
    } catch (error) {
        console.log('fail');
        
    }
}


export {connect}