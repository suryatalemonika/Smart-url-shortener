require('dotenv').config();
require('./config/db');
const express = require('express');
const passport = require('passport');
require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const rateLimiter = require('./middlewares/rateLimiter');
const { UserModel } = require('./models/User')
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
    console.log(`get route hit`);
    res.status(200).json({
        success: true,
        message: 'WELCOME ON THE BOARD'
    })
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'A user is already registered with this e-mail address.',
            });
        }
        let hashedpassword = await bcrypt.hash(password, 10);
        const addUser = new UserModel({ name, email, password: hashedpassword })

        await addUser.save();
        res.status(201).json({
            success: true,
            message: 'Signup successful',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `internal server error : ${error}`
        })
        console.log(`error while inserting user in database `);
    }
})

app.use('/auth', authRoutes);
app.use('/api', rateLimiter, urlRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
