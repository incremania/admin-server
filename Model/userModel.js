const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    unmodified_user: {
        type: String
    },
    token: {
        type: String,
        required: true
    },
    machine_limit: {
        type: Number,
        required: true
    },
    machine_name: { 
        type: String
    },
    time_frame: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    machine_name: [{
        type: String
    }]
}, 
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
