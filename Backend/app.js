const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require("./models/userModel");
const Notes = require("./models/notesModel");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "https://notid-frontend-r54xbefxs-ayushs-projects-4645ae36.vercel.app",
    credentials: true
}));

function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not logged in" });

    try {
        let data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }
    catch(err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

app.get('/api/user', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

app.post("/api/register", async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, email, password: hashed
        });

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Required for HTTPS
            sameSite: 'none'
        });

        res.json({message: "User resistered"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post("/api/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({error: "Email or password is wrong"});

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.status(400).json({error: "Email or password is wrong"});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,  // Required for HTTPS
        sameSite: 'none'
    });

    res.json({message: "Logged in"});
});

app.get("/api/notes", isLoggedIn, async (req, res) => {
    const notes = await Notes.find({userId: req.user.id});
    res.json(notes);
});

app.post("/api/notes", isLoggedIn, async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user.id;

    const note = await Notes.create({
        title, content, userId
    })

    res.json(note);
});

app.put("/api/notes/:id", isLoggedIn, async (req, res) => {
    const {title, content} = req.body;

    const note = await Notes.findByIdAndUpdate(
        req.params.id,
        {title, content},
        {new: true}
    );

    res.json(note);
});

app.delete("/api/notes/:id", isLoggedIn, async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({message: "Note deleted"});
});

app.get("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logged out"});
});

mongoose.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT || 5000);