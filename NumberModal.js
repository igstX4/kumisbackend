import mongoose from 'mongoose';

const NumberSchema = new mongoose.Schema(
    {
        number: {
            type: String
        }
    }
);

export default mongoose.model('Number', NumberSchema);