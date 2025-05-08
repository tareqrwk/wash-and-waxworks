// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    car: String,
    service: String,
    date: String,
    time: String,
    notes: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Route to receive bookings and send confirmation
app.post('/api/book', async (req, res) => {
    const booking = new Booking(req.body);

    try {
        await booking.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'washnwaxworks@gmail.com',
            to: booking.email,
            subject: '✅ Your Booking is Confirmed - Wash&WaxWorks',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="background-color: #1f2937; padding: 20px; color: white; text-align: center;">
                        <h1 style="margin: 0;">Wash&WaxWorks</h1>
                        <p style="margin: 5px 0 0; font-size: 14px;">Your car. Our care.</p>
                    </div>
                    <div style="padding: 30px;">
                        <h2 style="color: #1f2937;">Hi ${booking.name},</h2>
                        <p>Here are your appointment details:</p>
                        <ul style="list-style: none; padding: 0;">
                        <li><strong>Service:</strong> ${booking.service}</li>
                        <li><strong>Date:</strong> ${booking.date}</li>
                        <li><strong>Time:</strong> ${booking.time}</li>
                        </ul>
                        ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
                        <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
                    </div>
                    <div style="background-color: #111827; padding: 20px; color: #aaa; text-align: center; font-size: 12px;">
                        Wash&WaxWorks · London, ON · (226) 700-5701<br/>
                        <a href="mailto:washnwaxworks@gmail.com" style="color: #bbb;">washnwaxworks@gmail.com</a>
                    </div>
                    </div>
                </div>
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Email error:', err);
                return res.status(500).json({ message: 'Booking saved, but failed to send email.' });
            } else {
                console.log('Booking confirmation email sent:', info.response);
                return res.status(200).json({ message: 'Booking saved and email sent successfully!' });
            }
        });
    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).json({ message: 'Failed to save booking.' });
    }
});

// Fetch bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve bookings.' });
    }
});

// Admin Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const admins = JSON.parse(process.env.ADMINS);

    const validAdmin = admins.find(
        (admin) => admin.email === email && admin.password === password
    );

    if (!validAdmin) {
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
    }

    res.status(200).json({ token: 'secure-admin-token' });
});

// Contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: 'washnwaxworks@gmail.com',
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Email failed to send.' });
        } else {
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});