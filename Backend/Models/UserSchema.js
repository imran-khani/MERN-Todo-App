
 import mongoose from 'mongoose';

    const UserSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
            unique: true
        },
    })
    export const User = mongoose.model('User', UserSchema);