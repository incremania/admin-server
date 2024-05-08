const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    machine_limit: {
        type: Number,
        required: true
    },
    machine_name: { // Corrected typo here
        type: String
    },
    time_frame: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
