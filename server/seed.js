require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mindmend')
  .then(() => console.log('✅ MongoDB Connected for Seeding...'))
  .catch(err => console.log(err));

const seedUsers = async () => {
    try {
        // 1. Clear existing special accounts (optional, prevents duplicates)
        await User.deleteMany({ email: { $in: ['admin@mindmend.com', 'doctor@mindmend.com'] } });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt); // Default password

        // 2. Create Admin
        const adminUser = new User({
            name: 'System Admin',
            email: 'admin@mindmend.com',
            password: hashedPassword,
            role: 'admin',
            gamification: { points: 9999, streak: 100 }
        });

        // 3. Create Doctor
        const doctorUser = new User({
            name: 'Dr. Sarah Smith',
            email: 'doctor@mindmend.com',
            password: hashedPassword,
            role: 'doctor',
            gamification: { points: 0, streak: 0 }
        });

        await adminUser.save();
        await doctorUser.save();

        console.log('🎉 Accounts Created Successfully!');
        console.log('-----------------------------------');
        console.log('👤 Admin Login:  admin@mindmend.com  / 123456');
        console.log('🩺 Doctor Login: doctor@mindmend.com / 123456');
        console.log('-----------------------------------');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUsers();