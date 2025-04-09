import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connecttoDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() =>{
            console.log('connected to mongoDB');
            
        })
        .catch((error) =>{
            console.error('error connecting to mongoDB:',error)
            
        })
        
    }catch(error) {
        console.log(error);
        
    }
}
export default connecttoDatabase