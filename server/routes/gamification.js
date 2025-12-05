const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// GET STATS (With Name & Mindful Minutes)
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            name: user.name,
            streak: user.gamification.streak,
            points: user.gamification.points,
            mindfulMinutes: user.gamification.mindfulMinutes || 0,
            lastActive: user.gamification.lastActive
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// LOG TIME
router.post('/log-time', auth, async (req, res) => {
    try {
        const { minutes } = req.body;
        const user = await User.findById(req.user.id);
        user.gamification.mindfulMinutes = (user.gamification.mindfulMinutes || 0) + minutes;
        user.gamification.points += Math.floor(minutes); 
        await user.save();
        res.json(user.gamification);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DAILY ACTION (Streak Update)
router.post('/action', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const now = new Date();
        const lastActive = user.gamification.lastActive ? new Date(user.gamification.lastActive) : new Date(0);
        const diffDays = Math.ceil(Math.abs(now - lastActive) / (1000 * 60 * 60 * 24)); 

        let message = "Keep it up!";
        if (diffDays <= 1) {
             if (now.getDate() !== lastActive.getDate()) {
                 user.gamification.streak += 1;
                 user.gamification.points += 10;
                 message = "Streak Increased!";
             }
        } else {
            user.gamification.streak = 1;
            message = "Streak Reset.";
        }
        user.gamification.lastActive = now;
        await user.save();
        res.json({ msg: message, streak: user.gamification.streak, points: user.gamification.points });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;