const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});