// server/index.js
require('dotenv').config(); //Load environment variables from .env file
const express = require('express'); //Import Express framework
const cors = require('cors'); //Import CORS middleware
const bodyParser = require('body-parser'); //Import body-parser for parsing JSON requests
const nodemailer = require('nodemailer'); //Import nodemailer for sending emails
const { createClient } = require('@supabase/supabase-js'); //Import Supabase client

const app = express(); //Initialize Express app
const PORT = 5000; //Define the server port

//Middleware setup
app.use(cors()); //Enable CORS for cross-origin requests
app.use(bodyParser.json()); //Parse incoming JSON requests

//Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
console.log('Connected to Supabase');

//Route: Recieve booking and send confirmation email
app.post('/api/book', async (req, res) => {
    const { name, email, phone, car, service, date, time, location, notes } = req.body;

    try{
        const { data, error } = await supabase
            .from('bookings')
            .insert([{ name, email, phone, car, service, date, time, location, notes }]);

        if (error) throw error;

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
            to: email,
            subject: '✅ Your Booking is Confirmed - Wash&WaxWorks',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="background-color: #1f2937; padding: 20px; color: white; text-align: center;">
                            <h1 style="margin: 0;">Wash&WaxWorks</h1>
                            <p style="margin: 5px 0 0; font-size: 14px;">Your Car. Our Care.</p>
                        </div>
                    <div style="padding: 30px;">
                        <h2 style="color: #1f2937;">Hi ${name},</h2>
                        <p>Here are your appointment details:</p>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Service:</strong> ${service}</li>
                            <li><strong>Date:</strong> ${date}</li>
                            <li><strong>Time:</strong> ${time}</li>
                        </ul>
                        ${notes? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
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
        const { data, error } = await supabase
            .from('bookings')
            .select('*');

        if (error) throw error;

        res.status(200).json(data); //Send bookings as JSON response
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
        // Check if a visit row exists
        const { data: existing, error: fetchError } = await supabase
            .from('visits')
            .select('*')
            .limit(1)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // PGRST116 = no rows

        if (!existing) {
            // Create the first visit row
            const { data, error } = await supabase
                .from('visits')
                .insert([{ count: 1 }])
                .select()
                .single();

            if (error) throw error;
            res.status(200).json({ count: data.count });
        } else {
            // Increment the existing row
            const { data, error } = await supabase
                .from('visits')
                .update({ count: existing.count + 1 })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            res.status(200).json({ count: data.count });
        }
    }
    catch (err) {
        console.error("Visit increment failed", err);
        res.status(500).json({ message: 'Failed to track visit.'});
    }  
});

//Route to get website visits
app.get('/api/visit', async (req, res) => {
    try{
        const { data, error } = await supabase
            .from('visits')
            .select('count')
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        res.status(200).json({ count: data?.count || 0 }); //Send the visit count
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
        const { data, error } = await supabase
            .from('reviews')
            .insert([{ name, review }]);

        if (error) throw error;

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
        const { data, error } = await supabase
            .from('reviews')
            .select('*');

        if (error) throw error;

        res.status(200).json(data); //Send reviews as JSON response
    }
    catch(err){
        console.error('Failed to load reviews');
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
});

//Route to get featured reviews only
app.get('/api/reviews/featured', async (req, res) => {
  try {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('featured', true);

    if (error) throw error;

    res.status(200).json(data); //Send featured reviews as JSON response
  } catch (err) {
    console.error('Error fetching featured reviews:', err);
    res.status(500).json({ message: 'Failed to retrieve featured reviews' });
  }
});

//Route to mark a review as featured (for homepage)
app.put('/api/reviews/:id/feature', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .update({ featured: true })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json(data); //Send the updated review
    } 
    catch (err) {
        console.error('Failed to feature review:', err);
        res.status(500).json({ message: 'Could not feature review' });
    }
});

//Route to delete a review
app.delete('/api/review/:id', async (req, res) => {
    try{
        const { data, error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;

        if(!data) {
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
    console.log(`Server running on http://localhost:5000`);
});