// server/index.js
require('dotenv').config(); //Load environment variables from .env file
const express = require('express'); //Import Express framework
const cors = require('cors'); //Import CORS middleware
const mongoose = require('mongoose'); //Import Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); //Import body-parser for parsing JSON requests
const nodemailer = require('nodemailer'); //Import nodemailer for sending emails

const app = express(); //Initialize Express app
const PORT = 5000; //Define the server port

//Middleware setup
app.use(cors()); //Enable CORS for cross-origin requests
app.use(bodyParser.json()); //Parse incoming JSON requests

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err))

//Define Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String, 
    email: String,
    phone: String,
    car: String,
    service: String,
    date: String,
    time: String,
    location: String,
    notes: String
});

//Define Booking model
const Booking = mongoose.model('Booking', bookingSchema);

//Define Visit Count Schema
const visitSchema = new mongoose.Schema({
    count: { type: Number, default: 0}
});

//Define Visit model
const Visit = mongoose.model('Visit', visitSchema);

//Define Review Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    featured: {type: Boolean, default: false},
});

//Define Review model
const Review = mongoose.model("Review", reviewSchema);

//Route: Recieve booking and send confirmation email
app.post('/api/book', async (req, res) => {
    const booking = new Booking(req.body); //Create a new booking document

    try{
        await booking.save(); //Save booking to the database
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        //Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: booking.email,
            subject: '✅ Your Booking is Confirmed - Wash&WaxWorks',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="background-color: #1f2937; padding: 20px; color: white; text-align: center;">
                            <h1 style="margin: 0;">Wash&WaxWorks</h1>
                            <p style="margin: 5px 0 0; font-size: 14px;">Your Car. Our Care.</p>
                        </div>
                    <div style="padding: 30px;">
                        <h2 style="color: #1f2937;">Hi ${booking.name},</h2>
                        <p>Here are your appointment details:</p>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Service:</strong> ${booking.service}</li>
                            <li><strong>Date:</strong> ${booking.date}</li>
                            <li><strong>Time:</strong> ${booking.time}</li>
                        </ul>
                        ${booking.notes? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
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

        //Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err){
                console.log('Email error:', err);
                return res.status(500).json({ message: 'Booking saved, but failed to send email.'});
            }
            console.log('Booking confirmation email sent:', info.response);
            return res.status(200).json({ message: 'Booking saved and email sent successfully!'});
        });
    }
    catch(err) {
        console.error('Booking error:', err);
        res.status(500).json({ message: 'Failed to save booking.'});
    }
});

//Route: Get all bookings
app.get('/api/bookings', async (req, res) => {
    try{
        const bookings = await Booking.find(); //Fetch all bookings from the database
        res.status(200).json(bookings); //Send bookings as JSON response
    }
    catch(err){
        res.status(500).json({ message: 'Failed to retrieve bookings.' });
    }
});

//Route: Admin login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const admins = JSON.parse(process.env.ADMINS);
    const validAdmin = admins.find(
        (admin) => admin.email === email && admin.password === password
    );

    if(!validAdmin){
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials'});
    }

    res.status(200).json({ token: 'secure-admin-token'}); //Send a mock token for authentication
});

//Route: Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body; //Extract contact form data

    //Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //Email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    //Send email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.error(err);
            res.status(500).json({ message: 'Email failed to send.' });
        }
        else{
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

//Route to increment website visits
app.post('/api/visit', async(req, res) => {
    try{
        let visitDoc = await Visit.findOne(); //Find the visit document
        if (!visitDoc){
            visitDoc = new Visit({ count: 1}); //Create a new document if none exists
        }
        else{
            visitDoc.count += 1 //Increment the visit count
        }
        await visitDoc.save(); //Save the updated document
        res.status(200).json({count: visitDoc.count}); //Send the updated count
    }
    catch (err) {
        console.error("Visit increment failed", err);
        res.status(500).json({ message: 'Failed to track visit.'});
    }  
});

//Route to get website visits
app.get('/api/visit', async (req, res) => {
    try{
        const visitDoc = await Visit.findOne(); //Fetch the visit document
        res.status(200).json({ count: visitDoc?.count || 0}); //Send the visit count
    }
    catch (err) {
        console.error("Fetch visits failed:", err);
        res.status(500).json({message: "Failed to get visits."});
    }
});

//Route to save reviews
app.post('/api/review', async (req, res) => {
    const { name, review } = req.body; //Extract review data
    if(!name || !review){
        return res.status(400).json({ message: 'Name and review are required.' });
    }

    try{
        const newReview = new Review ({ name, review }); //Create a new review document
        await newReview.save(); //Save the review to the database
        res.status(200).json({ message: 'Review saved successfully!' });
    }
    catch(err){
        console.error('Review save error:', err);
        res.status(500).json({ message: "Failed to save review."})
    }
});

//Route to fetch reviews
app.get('/api/reviews', async (req, res) => {
    try{
        const reviews = await Review.find(); //Fetch all reviews from the database
        res.status(200).json(reviews); //Send reviews as JSON response
    }
    catch(err){
        console.error('Failed to load reviews');
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
});

//Route to get featured reviews only
app.get('/api/reviews/featured', async (req, res) => {
  try {
    const featuredReviews = await Review.find({ featured: true }); //Fetch only featured reviews
    res.status(200).json(featuredReviews); //Send featured reviews as JSON response
  } catch (err) {
    console.error('Error fetching featured reviews:', err);
    res.status(500).json({ message: 'Failed to retrieve featured reviews' });
  }
});

//Route to mark a review as featured (for homepage)
app.put('/api/reviews/:id/feature', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id, //Find review by ID
            { featured: true }, //Update featured status to true
            { new: true } //Return the updated document
        ); 
        res.status(200).json(review); //Send the updated review
    } 
    catch (err) {
        console.error('Failed to feature review:', err);
        res.status(500).json({ message: 'Could not feature review' });
    }
});

//Route to delete a review
app.delete('/api/review/:id', async (req, res) => {
    try{
        const deleted = await Review.findByIdAndDelete(req.params.id);  //Delete review by ID
        if(!deleted) {
            return res.status(404).json({ message: 'Review not found.' });
        }
        res.status(200).json({ message: 'Review deleted successfuly.', id: req.params.id });
    }
    catch(err) {
        console.error('Deleted review failed:', err);
        res.status(500).json({ message: 'Failed to delete review.'});
    }
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});