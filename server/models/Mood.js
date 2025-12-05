// const mongoose = require('mongoose');

// const MoodSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     mood: {
//         type: String, // e.g., "Joyful", "Tired"
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Mood', MoodSchema);
const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // 💡 FIX: Reference the singular, capitalized Model Name 'User'
        ref: 'User' 
    },
    mood: {
        type: String, // e.g., "Joyful", "Tired"
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Mood', MoodSchema);