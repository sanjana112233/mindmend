// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const axios = require('axios');
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');

// // // Models
// // const User = require('./models/User');
// // const Mood = require('./models/Mood');       
// // const Journal = require('./models/Journal'); 

// // const auth = require('./middleware/auth');

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindmend')
// //   .then(() => console.log('✅ MongoDB Connected'))
// //   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// // // Streak Helper
// // const updateStreak = async (userId) => {
// //     try {
// //         const user = await User.findById(userId);
// //         if (!user) return null;
// //         const now = new Date();
// //         const lastActive = user.gamification.lastActive ? new Date(user.gamification.lastActive) : new Date(0); 
// //         const diffDays = Math.ceil(Math.abs(now - lastActive) / (1000 * 60 * 60 * 24)); 

// //         if (diffDays <= 1) {
// //              if (now.getDate() !== lastActive.getDate()) {
// //                  user.gamification.streak = (user.gamification.streak || 0) + 1;
// //                  user.gamification.points = (user.gamification.points || 0) + 10;
// //              }
// //         } else {
// //             user.gamification.streak = 1;
// //         }
// //         user.gamification.lastActive = now;
// //         await user.save();
// //         return user.gamification;
// //     } catch (err) { console.error("Streak Error", err); }
// // };

// // // --- ROUTES ---

// // // Auth
// // app.post('/api/auth/register', async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     let user = await User.findOne({ email });
// //     if (user) return res.status(400).json({ msg: 'User already exists' });
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);
// //     user = new User({ 
// //         name, 
// //         email, 
// //         password: hashedPassword,
// //         gamification: { streak: 0, points: 0, lastActive: new Date() } 
// //     });
// //     await user.save();
// //     const payload = { user: { id: user.id, role: user.role } };
// //     jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
// //         res.json({ token, role: user.role });
// //     });
// //   } catch (err) { res.status(500).send('Server Error'); }
// //  });
// // // server.js (Only the /api/auth/register route is shown)

// // // Auth

// // app.post('/api/auth/login', async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     let user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
// //     const payload = { user: { id: user.id, role: user.role } };
// //     jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
// //         res.json({ token, role: user.role });
// //     });
// //   } catch (err) { res.status(500).send('Server Error'); }
// // });

// // // 1. MOODS
// // app.post('/api/moods', auth, async (req, res) => {
// //     try {
// //         const newMood = new Mood({ user: req.user.id, mood: req.body.mood });
// //         await newMood.save();
// //         const stats = await updateStreak(req.user.id);
// //         res.json({ msg: 'Mood Saved', stats });
// //     } catch (err) { res.status(500).send('Server Error'); }
// // });
// // // Get the roleCheck middleware
// // const roleCheck = require('./middleware/roleCheck'); 

// // // 7. --- ADMIN ROUTES ---
// // app.get('/api/admin/stats', auth, roleCheck(['admin']), async (req, res) => {
// //     try {
// //         const totalUsers = await User.countDocuments();
// //         const activeDoctors = await User.countDocuments({ role: 'doctor' });
// //         const totalJournals = await Journal.countDocuments();

// //         // This is a simple count; you would add more complex logic here (e.g., ML requests).
// //         res.json({
// //             totalUsers,
// //             activeDoctors,
// //             totalJournals,
// //             systemHealth: "OK"
// //         });
// //     } catch (err) { 
// //         console.error("Admin Stats Error:", err.message);
// //         res.status(500).send('Server Error'); 
// //     }
// // });

// // app.get('/api/admin/users', auth, roleCheck(['admin']), async (req, res) => {
// //     try {
// //         // Fetch all users but exclude sensitive fields like password
// //         const users = await User.find().select('-password');
// //         res.json(users);
// //     } catch (err) {
// //         console.error("Admin User List Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // 8. --- DOCTOR ROUTES ---
// // app.get('/api/doctor/patients', auth, roleCheck(['doctor']), async (req, res) => {
// //     try {
// //         // 💡 Assumption: For now, the doctor can see ALL standard users.
// //         // In a real system, you'd filter by an 'assignedDoctorId' field in the User model.
// //         // For dynamic data, we'll fetch all users with the 'user' role.
// //         const patients = await User.find({ role: 'user' }).select('name email gamification');

// //         // Fetch the latest journal and mood for each patient (simplified logic)
// //         const patientsWithData = await Promise.all(patients.map(async (patient) => {
// //             const latestJournal = await Journal.findOne({ user: patient._id }).sort({ date: -1 }).limit(1);
// //             const latestMood = await Mood.findOne({ user: patient._id }).sort({ date: -1 }).limit(1);

// //             return {
// //                 _id: patient._id,
// //                 name: patient.name,
// //                 email: patient.email,
// //                 lastMood: latestMood ? latestMood.mood : 'N/A',
// //                 sentiment: latestJournal ? latestJournal.sentimentScore : 0,
// //                 status: latestJournal && latestJournal.sentimentScore < -0.5 ? 'High Risk' : 'Stable',
// //             };
// //         }));

// //         res.json(patientsWithData);
// //     } catch (err) {
// //         console.error("Doctor Patients Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });
// // app.get('/api/moods', auth, async (req, res) => {
// //     try {
// //         const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 }).limit(7);
// //         res.json(moods.reverse()); 
// //     } catch (err) { res.status(500).send('Server Error'); }
// // });

// // // 2. JOURNAL (Uses Smart Analysis)
// // app.post('/api/journal', auth, async (req, res) => {
// //     try {
// //         let analysis = { sentiment: 0, text: "Keep writing!" };
// //         try {
// //             const mlRes = await axios.post('http://localhost:8000/analyze-journal', { text: req.body.text });
// //             analysis = mlRes.data;
// //         } catch (e) { console.log("ML Offline"); }
// //         const newEntry = new Journal({
// //             user: req.user.id,
// //             text: req.body.text,
// //             sentimentScore: analysis.sentiment_score || 0,
// //             affirmation: analysis.affirmation || "Journaling clears the mind."
// //         });
// //         await newEntry.save();
// //         await updateStreak(req.user.id);
// //         res.json(newEntry); 
// //     } catch (err) { res.status(500).send('Server Error'); }
// // });

// // // 3. WEEKLY REPORTS
// // app.post('/api/reports/generate', auth, async (req, res) => {
// //     try {
// //         const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
// //         const journalTexts = journals.map(j => j.text);
// //         const response = await axios.post('http://localhost:8000/trigger-report', {
// //             user_id: req.user.id,
// //             journal_entries: journalTexts
// //         });
// //         res.json(response.data);
// //     } catch (err) { res.status(500).send('Error triggering report'); }
// // });

// // // 4. CHAT (Uses Smart Analysis)
// // app.post('/api/chat', auth, async (req, res) => {
// //   try {
// //     const response = await axios.post('http://localhost:8000/chat-response', { message: req.body.message });
// //     res.json(response.data);
// //   } catch (err) { res.status(500).send('ML Service Error'); }
// // });
// // // Get the roleCheck middleware (Ensure this is available at the top of server.js)
// // //const roleCheck = require('./middleware/roleCheck'); 

// // // 5. --- USER STATS ROUTE ---
// // // Required for the standard Dashboard.jsx to populate stats
// // // server.js

// // // 5. --- USER STATS ROUTE ---
// // app.get('/api/user/stats', auth, roleCheck(['user', 'doctor', 'admin']), async (req, res) => {
// //     try {
// //         const userId = req.user.id;

// //         // 1. Fetch User data for gamification stats
// //         // Select 'gamification' and 'name' (used for greeting on dashboard)
// //         const user = await User.findById(userId).select('gamification name');
// //         if (!user) return res.status(404).json({ msg: 'User not found' });

// //         // 2. Count Journal Entries
// //         const journalCount = await Journal.countDocuments({ user: userId });

// //         // 3. Get Latest Mood
// //         // Use .lean() for faster query if we only need one field
// //         const latestMoodDoc = await Mood.findOne({ user: userId }).sort({ date: -1 }).select('mood').lean();

// //         // 4. Determine mood value, defaulting if the document is not found
// //         const latestMood = latestMoodDoc ? latestMoodDoc.mood : 'N/A';

// //         res.json({
// //             name: user.name, // Added name for greeting
// //             streak: user.gamification.streak || 0, // Ensure default to 0 if null
// //             points: user.gamification.points || 0, // Ensure default to 0 if null
// //             journalCount: journalCount,
// //             latestMood: latestMood 
// //         });

// //     } catch (err) { 
// //         console.error("User Stats Error:", err.message);
// //         res.status(500).send('Server Error'); 
// //     }
// // });// ----------------------------

// // // 6. --- ADMIN ROUTES (Needed for AdminDashboard.jsx) ---
// // // server.js

// // // 6. --- ADMIN ROUTES ---
// // // ... (omitted /api/admin/stats) ...

// // app.get('/api/admin/users', auth, roleCheck(['admin']), async (req, res) => {
// //     try {
// //         // Fetch all users, excluding password. Sort by creation date to see recent ones.
// //         const users = await User.find().select('-password').sort({ _id: -1 }); 
// //         res.json(users);
// //     } catch (err) {
// //         console.error("Admin User List Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });
// // app.get('/api/admin/users', auth, roleCheck(['admin']), async (req, res) => {
// //     try {
// //         const users = await User.find().select('-password');
// //         res.json(users);
// //     } catch (err) {
// //         console.error("Admin User List Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // 7. --- DOCTOR ROUTES (Needed for DoctorDashboard.jsx) ---
// // // server.js

// // // 7. --- DOCTOR ROUTES ---
// // app.get('/api/doctor/patients', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
// //     try {
// //         // Fetch all users with the 'user' role
// //         const patients = await User.find({ role: 'user' }).select('name email gamification');

// //         const patientsWithData = await Promise.all(patients.map(async (patient) => {
// //             // Find latest documents, use .lean() for optimization
// //             const latestJournal = await Journal.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();
// //             const latestMood = await Mood.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();

// //             const sentiment = latestJournal ? latestJournal.sentimentScore : 0;

// //             return {
// //                 _id: patient._id,
// //                 name: patient.name,
// //                 email: patient.email,
// //                 lastMood: latestMood ? latestMood.mood : 'N/A', // Null check added
// //                 sentiment: sentiment,
// //                 // Status derivation
// //                 status: sentiment < -0.5 ? 'High Risk' : 'Stable',
// //             };
// //         }));

// //         res.json(patientsWithData);
// //     } catch (err) {
// //         console.error("Doctor Patients Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });
// // // server.js

// // // 8. --- DOCTOR PATIENT FILE ROUTE ---
// // app.get('/api/doctor/patient/:id/file', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
// //     try {
// //         const patientId = req.params.id;

// //         // Fetch the specific user (patient) details
// //         const patient = await User.findById(patientId).select('name email role gamification');
// //         if (!patient || patient.role !== 'user') {
// //             return res.status(404).json({ msg: 'Patient not found or unauthorized.' });
// //         }

// //         // Fetch all journal entries for this patient, sorted chronologically
// //         const journals = await Journal.find({ user: patientId }).sort({ date: -1 }).lean();

// //         // 💡 ASSUMPTION: Reports are stored somewhere. For now, we'll mock them.
// //         const reports = [
// //             { id: 1, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), summary: "High anxiety baseline detected last week. Needs attention." },
// //             { id: 2, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), summary: "Stable mood, showing good streak consistency." }
// //         ];

// //         res.json({
// //             patientDetails: {
// //                 name: patient.name,
// //                 email: patient.email,
// //                 gamification: patient.gamification
// //             },
// //             journals: journals,
// //             reports: reports // Replace with actual DB fetch if you store reports
// //         });

// //     } catch (err) {
// //         console.error("Doctor Patient File Error:", err.message);
// //         res.status(500).send('Server Error');
// //     }
// // });
// // // ... (omitted existing app.use('/api/gamification') and app.listen) ...
// // // 5. ADMIN BROADCAST (NEW)
// // app.post('/api/admin/broadcast', auth, async (req, res) => {
// //     try {
// //         // Security check
// //         if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access Denied.' });

// //         const { subject, body } = req.body;
// //         // Fetch ALL emails
// //         const users = await User.find().select('email');
// //         const emailList = users.map(user => user.email);

// //         // Send to Python
// //         const response = await axios.post('http://localhost:8000/send-bulk-emails', {
// //             emails: emailList,
// //             subject: subject,
// //             body: body
// //         });
// //         res.json(response.data);
// //     } catch (err) { res.status(500).send('Error sending broadcast'); }
// // });

// // // 5. GET REPORT RESULT STATUS (NEW)
// // app.get('/api/reports/result/:taskId', auth, async (req, res) => {
// //     try {
// //         const { taskId } = req.params;
// //         // Proxy the request to the Python ML Service
// //         const response = await axios.get(`http://localhost:8000/report-status/${taskId}`);
// //         res.json(response.data);
// //     } catch (err) {
// //         console.error("Report Status Proxy Error:", err.message);
// //         res.status(500).send('Error checking report status.');
// //     }
// // });

// // // ... existing app.use('/api/gamification') and app.listen ...

// // // 6. GAMIFICATION ROUTES
// // app.use('/api/gamification', require('./routes/gamification'));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const axios = require('axios');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const Message = require('./models/Message');

// // --- MIDDLEWARE IMPORTS (CRITICAL: Must appear ONLY ONCE) ---
// const auth = require('./middleware/auth');
// const roleCheck = require('./middleware/roleCheck'); 

// // --- MODEL IMPORTS ---
// const User = require('./models/User');
// const Mood = require('./models/Mood');       
// const Journal = require('./models/Journal'); 

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindmend')
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// // --- HELPER FUNCTION: STREAK & POINTS ---
// const updateStreak = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) return null;
//         const now = new Date();
//         const lastActive = user.gamification.lastActive ? new Date(user.gamification.lastActive) : new Date(0); 
//         const diffDays = Math.ceil(Math.abs(now - lastActive) / (1000 * 60 * 60 * 24)); 

//         if (diffDays <= 1) {
//              // Only award points/increment streak on a new day
//              if (now.getDate() !== lastActive.getDate()) {
//                  user.gamification.streak = (user.gamification.streak || 0) + 1;
//                  user.gamification.points = (user.gamification.points || 0) + 10;
//              }
//         } else {
//             // Streak reset
//             user.gamification.streak = 1;
//         }
//         user.gamification.lastActive = now;
//         await user.save();
//         return user.gamification;
//     } catch (err) { console.error("Streak Error", err); }
// };

// // =========================================================================
// //                               --- ROUTES ---
// // =========================================================================

// // --- AUTHENTICATION ROUTES ---

// app.post('/api/auth/register', async (req, res) => {
//   const { name, email, password, role } = req.body; // Added role destructure
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     const userRole = ['user', 'doctor', 'admin'].includes(role) ? role : 'user'; // Basic role validation

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({ 
//         name, 
//         email, 
//         password: hashedPassword,
//         role: userRole,
//         gamification: { streak: 0, points: 0, lastActive: new Date() } 
//     });

//     await user.save();

//     const payload = { user: { id: user.id, role: user.role } };
//     jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
//         res.json({ token, role: user.role });
//     });
//   } catch (err) { 
//     console.error(err.message);
//     res.status(500).send('Server Error'); 
//   }
//  });

// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
//     const payload = { user: { id: user.id, role: user.role } };
//     jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
//         res.json({ token, role: user.role });
//     });
//   } catch (err) { 
//     console.error(err.message);
//     res.status(500).send('Server Error'); 
//   }
// });

// // --- USER DATA & MOODS ---

// app.post('/api/moods', auth, async (req, res) => {
//     try {
//         const newMood = new Mood({ user: req.user.id, mood: req.body.mood });
//         await newMood.save();
//         const stats = await updateStreak(req.user.id);
//         res.json({ msg: 'Mood Saved', stats });
//     } catch (err) { res.status(500).send('Server Error'); }
// });

// app.get('/api/moods', auth, async (req, res) => {
//     try {
//         const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 }).limit(7);
//         res.json(moods.reverse()); 
//     } catch (err) { res.status(500).send('Server Error'); }
// });

// // --- JOURNAL & ML ANALYSIS ---

// app.post('/api/journal', auth, async (req, res) => {
//     try {
//         let analysis = { sentiment: 0, text: "Keep writing!" };
//         try {
//             // 💡 Call External ML Service (Port 8000)
//             const mlRes = await axios.post('http://localhost:8000/analyze-journal', { text: req.body.text });
//             analysis = mlRes.data;
//         } catch (e) { console.log("ML Offline or Error during analysis"); }

//         const newEntry = new Journal({
//             user: req.user.id,
//             text: req.body.text,
//             sentimentScore: analysis.sentiment_score || 0,
//             affirmation: analysis.affirmation || "Journaling clears the mind."
//         });
//         await newEntry.save();
//         await updateStreak(req.user.id);
//         res.json(newEntry); 
//     } catch (err) { 
//         console.error("Journal Error:", err);
//         res.status(500).send('Server Error'); 
//     }
// });

// app.get('/api/user/stats', auth, roleCheck(['user', 'doctor', 'admin']), async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const user = await User.findById(userId).select('gamification name');
//         if (!user) return res.status(404).json({ msg: 'User not found' });

//         const journalCount = await Journal.countDocuments({ user: userId });
//         const latestMoodDoc = await Mood.findOne({ user: userId }).sort({ date: -1 }).select('mood').lean();

//         const latestMood = latestMoodDoc ? latestMoodDoc.mood : 'N/A';
//         const streak = user.gamification?.streak ?? 0;
//         const points = user.gamification?.points ?? 0;

//         res.json({
//             name: user.name, 
//             streak: streak, 
//             points: points, 
//             journalCount: journalCount,
//             latestMood: latestMood 
//         });

//     } catch (err) { 
//         console.error("User Stats Error:", err.message);
//         res.status(500).send('Server Error'); 
//     }
// });

// // --- REPORTING & BACKGROUND TASKS ---

// app.post('/api/reports/generate', auth, async (req, res) => {
//     try {
//         const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
//         const journalTexts = journals.map(j => j.text);

//         // 💡 Call External ML Service (Port 8000) to start job
//         const response = await axios.post('http://localhost:8000/trigger-report', {
//             user_id: req.user.id,
//             journal_entries: journalTexts
//         });
//         res.json(response.data); // Expects { taskId: "..." }
//     } catch (err) { 
//         console.error("Report Trigger Error:", err);
//         res.status(500).send('Error triggering report'); 
//     }
// });

// app.get('/api/reports/result/:taskId', auth, async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         // 💡 Proxy the request to check the status of the Celery job
//         const response = await axios.get(`http://localhost:8000/report-status/${taskId}`);
//         res.json(response.data); // Returns { status: "SUCCESS" | "PENDING", result: { ... } }
//     } catch (err) {
//         console.error("Report Status Proxy Error:", err.message);
//         // This is often an ECONNRESET/500 from ML service, return a generic failure
//         res.status(500).json({ status: "FAILURE", msg: "Could not connect to task runner." });
//     }
// });

// // --- ADMIN & DOCTOR ROUTES ---

// app.get('/api/admin/stats', auth, roleCheck(['admin']), async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments();
//         const activeDoctors = await User.countDocuments({ role: 'doctor' });
//         const totalJournals = await Journal.countDocuments();

//         res.json({
//             totalUsers,
//             activeDoctors,
//             totalJournals,
//             systemHealth: "OK"
//         });
//     } catch (err) { 
//         console.error("Admin Stats Error:", err.message);
//         res.status(500).send('Server Error'); 
//     }
// });

// app.get('/api/admin/users', auth, roleCheck(['admin']), async (req, res) => {
//     try {
//         const users = await User.find().select('-password').sort({ _id: -1 }); 
//         res.json(users);
//     } catch (err) {
//         console.error("Admin User List Error:", err.message);
//         res.status(500).send('Server Error');
//     }
// });

// app.post('/api/admin/broadcast', auth, roleCheck(['admin']), async (req, res) => {
//     try {
//         const { subject, body } = req.body;
//         const users = await User.find().select('email');
//         const emailList = users.map(user => user.email);

//         // 💡 Call External ML Service for bulk email job
//         const response = await axios.post('http://localhost:8000/send-bulk-emails', {
//             emails: emailList,
//             subject: subject,
//             body: body
//         });

//         res.json(response.data); 

//     } catch (err) { 
//         console.error("Bulk Email Error:", err);
//         res.status(500).send('Error sending broadcast'); 
//     }
// });


// app.get('/api/doctor/patients', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
//     try {
//         const patients = await User.find({ role: 'user' }).select('name email gamification');

//         const patientsWithData = await Promise.all(patients.map(async (patient) => {
//             const latestJournal = await Journal.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();
//             const latestMood = await Mood.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();

//             const sentiment = latestJournal ? latestJournal.sentimentScore : 0;

//             return {
//                 _id: patient._id,
//                 name: patient.name,
//                 email: patient.email,
//                 lastMood: latestMood?.mood ?? 'N/A', 
//                 sentiment: sentiment,
//                 status: sentiment < -0.5 ? 'High Risk' : 'Stable',
//             };
//         }));

//         res.json(patientsWithData);
//     } catch (err) {
//         console.error("Doctor Patients Error:", err.message);
//         res.status(500).send('Server Error');
//     }
// });

// app.get('/api/doctor/patient/:id/file', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
//     try {
//         const patientId = req.params.id;

//         const patient = await User.findById(patientId).select('name email role gamification');
//         if (!patient || patient.role !== 'user') {
//             return res.status(404).json({ msg: 'Patient not found or unauthorized.' });
//         }

//         const journals = await Journal.find({ user: patientId }).sort({ date: -1 }).lean();

//         // Mocked Reports (since reports are not saved to DB in current schema)
//         const reports = [
//             { id: 1, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), summary: "High anxiety baseline detected last week. Needs attention." },
//             { id: 2, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), summary: "Stable mood, showing good streak consistency." }
//         ];

//         res.json({
//             patientDetails: {
//                 name: patient.name,
//                 email: patient.email,
//                 gamification: patient.gamification
//             },
//             journals: journals,
//             reports: reports
//         });

//     } catch (err) {
//         console.error("Doctor Patient File Error:", err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // --- START SERVER ---

// // app.use('/api/gamification', require('./routes/gamification')); // Assuming this route file exists

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- MIDDLEWARE IMPORTS (CRITICAL: Must appear ONLY ONCE) ---
const auth = require('./middleware/auth');
const roleCheck = require('./middleware/roleCheck');

// --- MODEL IMPORTS ---
const User = require('./models/User');
const Mood = require('./models/Mood');
const Journal = require('./models/Journal');
const Message = require('./models/Message'); // 💡 ADDED: For Admin Broadcasts

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindmend')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- HELPER FUNCTION: STREAK & POINTS ---
const updateStreak = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return null;
        const now = new Date();
        const lastActive = user.gamification.lastActive ? new Date(user.gamification.lastActive) : new Date(0);
        const diffDays = Math.ceil(Math.abs(now - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            // Only award points/increment streak on a new day
            if (now.getDate() !== lastActive.getDate()) {
                user.gamification.streak = (user.gamification.streak || 0) + 1;
                user.gamification.points = (user.gamification.points || 0) + 10;
            }
        } else {
            // Streak reset
            user.gamification.streak = 1;
        }
        user.gamification.lastActive = now;
        await user.save();
        return user.gamification;
    } catch (err) { console.error("Streak Error", err); }
};

// =========================================================================
//                               --- ROUTES ---
// =========================================================================

// --- 1. AUTHENTICATION ---

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const userRole = ['user', 'doctor', 'admin'].includes(role) ? role : 'user';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole,
            gamification: { streak: 0, points: 0, lastActive: new Date() }
        });

        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
            res.json({ token, role: user.role });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 36000 }, (err, token) => {
            res.json({ token, role: user.role });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- 2. USER DATA & MOODS ---

app.post('/api/moods', auth, async (req, res) => {
    try {
        const newMood = new Mood({ user: req.user.id, mood: req.body.mood });
        await newMood.save();
        const stats = await updateStreak(req.user.id);
        res.json({ msg: 'Mood Saved', stats });
    } catch (err) { res.status(500).send('Server Error'); }
});

app.get('/api/moods', auth, async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 }).limit(7);
        res.json(moods.reverse());
    } catch (err) { res.status(500).send('Server Error'); }
});

// --- 3. JOURNAL & ML ANALYSIS ---

app.post('/api/journal', auth, async (req, res) => {
    try {
        let analysis = { sentiment: 0, text: "Keep writing!" };
        try {
            // Call External ML Service (Port 8000)
            const mlRes = await axios.post('http://localhost:8000/analyze-journal', { text: req.body.text });
            analysis = mlRes.data;
        } catch (e) { console.log("ML Offline or Error during analysis"); }

        const newEntry = new Journal({
            user: req.user.id,
            text: req.body.text,
            sentimentScore: analysis.sentiment_score || 0,
            affirmation: analysis.affirmation || "Journaling clears the mind."
        });
        await newEntry.save();
        await updateStreak(req.user.id);
        res.json(newEntry);
    } catch (err) {
        console.error("Journal Error:", err);
        res.status(500).send('Server Error');
    }
});

// --- 4. USER DASHBOARD STATS & MESSAGING ---

app.get('/api/user/stats', auth, roleCheck(['user', 'doctor', 'admin']), async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('gamification name');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const journalCount = await Journal.countDocuments({ user: userId });
        const latestMoodDoc = await Mood.findOne({ user: userId }).sort({ date: -1 }).select('mood').lean();

        const latestMood = latestMoodDoc ? latestMoodDoc.mood : 'N/A';
        const streak = user.gamification?.streak ?? 0;
        const points = user.gamification?.points ?? 0;

        res.json({
            name: user.name,
            streak: streak,
            points: points,
            journalCount: journalCount,
            latestMood: latestMood
        });

    } catch (err) {
        console.error("User Stats Error:", err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/user/latest-broadcast', auth, async (req, res) => {
    try {
        // Fetch the latest Message for the notification banner
        const message = await Message.findOne().sort({ date: -1 }).limit(1);
        res.json(message || null);
    } catch (err) {
        console.error("Latest Broadcast Error:", err);
        res.status(500).send('Server Error');
    }
});

// --- 5. REPORTING & BACKGROUND TASKS ---

app.post('/api/reports/generate', auth, async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
        const journalTexts = journals.map(j => j.text);

        // Call External ML Service (Port 8000) to start job
        const response = await axios.post('http://localhost:8000/trigger-report', {
            user_id: req.user.id,
            journal_entries: journalTexts
        });
        res.json(response.data);
    } catch (err) {
        console.error("Report Trigger Error:", err);
        res.status(500).send('Error triggering report');
    }
});

app.get('/api/reports/result/:taskId', auth, async (req, res) => {
    try {
        const { taskId } = req.params;
        // Proxy the request to check the status of the Celery job
        const response = await axios.get(`http://localhost:8000/report-status/${taskId}`);
        res.json(response.data);
    } catch (err) {
        console.error("Report Status Proxy Error:", err.message);
        res.status(500).json({ status: "FAILURE", msg: "Could not connect to task runner." });
    }
});

// --- 6. ADMIN & DOCTOR ROUTES (Role-Protected) ---

app.get('/api/admin/stats', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeDoctors = await User.countDocuments({ role: 'doctor' });
        const totalJournals = await Journal.countDocuments();

        res.json({
            totalUsers,
            activeDoctors,
            totalJournals,
            systemHealth: "OK"
        });
    } catch (err) {
        console.error("Admin Stats Error:", err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/admin/users', auth, roleCheck(['admin']), async (req, res) => {
    try {
        // Fetches all users for the Admin dashboard user list
        const users = await User.find().select('-password').sort({ _id: -1 });
        res.json(users);
    } catch (err) {
        console.error("Admin User List Error:", err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/admin/broadcast', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const { subject, body } = req.body;
        const users = await User.find().select('email');
        const emailList = users.map(user => user.email);

        // 💡 NEW: Save message to DB before sending (for user dashboard notifications)
        const newMessage = new Message({ subject, body });
        await newMessage.save();

        // Call External ML Service for bulk email job
        const response = await axios.post('http://localhost:8000/send-bulk-emails', {
            emails: emailList,
            subject: subject,
            body: body
        });

        // Return a custom message and server response data
        res.json({ ...response.data, message: "Broadcast queued successfully." });

    } catch (err) {
        console.error("Bulk Email Error:", err);
        res.status(500).send('Error sending broadcast');
    }
});


app.get('/api/doctor/patients', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
    try {
        // Fetches all users with role 'user' for the doctor's patient list
        const patients = await User.find({ role: 'user' }).select('name email gamification');

        const patientsWithData = await Promise.all(patients.map(async (patient) => {
            const latestJournal = await Journal.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();
            const latestMood = await Mood.findOne({ user: patient._id }).sort({ date: -1 }).limit(1).lean();

            const sentiment = latestJournal ? latestJournal.sentimentScore : 0;

            return {
                _id: patient._id,
                name: patient.name,
                email: patient.email,
                lastMood: latestMood?.mood ?? 'N/A',
                sentiment: sentiment,
                status: sentiment < -0.5 ? 'High Risk' : 'Stable',
            };
        }));

        res.json(patientsWithData);
    } catch (err) {
        console.error("Doctor Patients Error:", err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/doctor/patient/:id/file', auth, roleCheck(['doctor', 'admin']), async (req, res) => {
    try {
        const patientId = req.params.id;

        const patient = await User.findById(patientId).select('name email role gamification');
        if (!patient || patient.role !== 'user') {
            return res.status(404).json({ msg: 'Patient not found or unauthorized.' });
        }

        const journals = await Journal.find({ user: patientId }).sort({ date: -1 }).lean();

        const reports = [
            { id: 1, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), summary: "High anxiety baseline detected last week. Needs attention." },
            { id: 2, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), summary: "Stable mood, showing good streak consistency." }
        ];

        res.json({
            patientDetails: {
                name: patient.name,
                email: patient.email,
                gamification: patient.gamification
            },
            journals: journals,
            reports: reports
        });

    } catch (err) {
        console.error("Doctor Patient File Error:", err.message);
        res.status(500).send('Server Error');
    }
});


app.post('/api/chat', auth, async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8000/chat-response', { message: req.body.message });
        res.json(response.data);
    } catch (err) { res.status(500).send('ML Service Error'); }
});

// --- START SERVER ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));