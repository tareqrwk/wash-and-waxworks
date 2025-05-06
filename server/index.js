require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT  = 5000;

app.use(cors());
app.use(bodyParser.json());

//Route to recieve bookings and send confirmation
app.post('/api/book', (req,res) => {
    const booking = req.body;
    const filePath = './bookings.json';
    const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    existing.push(booking);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    //Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    //Email to client
    const mailOptions ={
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
      `
    };

    transporter.sendMail(mailOptions, (err, info) =>{
        if (err) {
            console.log("Email error:", err);
            return res.status(500).json({ message: 'Booking saved, but failed to send.'});
        }
        else{
            console.log('Booking confirmation email sent:', info.response);
            console.log("Sending confirmation to:", booking.email);
            return res.status(200).json({ message: 'Booking saved and email sent successfully!'});
        }
    });
});

//Route to send emails for contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'washnwaxworks@gmail.com',
            pass: 'fbou lerg odzn pclx'
        }
    });

    const mailOptions = {
        from: email,
        to: 'washnwaxworks@gmail.com',
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Email failed to send.' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});