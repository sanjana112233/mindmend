// const mongoose = require('mongoose');

// const JournalSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     sentimentScore: {
//         type: Number
//     },
//     affirmation: {
//         type: String
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Journal', JournalSchema);
const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // 💡 FIX: Reference the singular, capitalized Model Name 'User'
        ref: 'User' 
    },
    text: {
        type: String,
        required: true
    },
    sentimentScore: {
        type: Number
    },
    affirmation: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Journal', JournalSchema);