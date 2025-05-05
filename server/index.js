const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT  = 5000;

app.use(cors());
app.use(bodyParser.json());

//Route to recieve bookings
app.post('/api/book', (req,res) => {
    const booking = req.body;
    const filePath = './bookings.json';
    const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    existing.push(booking);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    res.status(200).json({message: 'Booking saved successfully!'});
});

//Route to send emails
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