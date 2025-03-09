// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user");
const listingsRouter = require("./routers/listingrouts");
const reviewsRouter = require("./routers/reviws");
const cookieParser=require("cookieparser")
dotenv.config();

const app = express();

// CORS Configuration
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        credentials: true, // Allow cookies & sessions   
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Database Connection
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Session Configuration
app.use(
    session({
        secret: "yourSecretKey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // ✅ Store sessions in MongoDB
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, 
            secure: true, ////  Set true if using HTTPS
        sameSite: "none"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
    done(null, user.id); // ✅ Store only the user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // ✅ Attach user object to req.user
    } catch (err) {
        done(err, null);
    }
});

 

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// Signup Route post
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    console.log(req.body)
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ username, email });
       const ragisterdUser=await User.register(newUser, password, (err, registeredUser) => {
        console.log(ragisterdUser)    
        if (err) return res.status(400).json({ message: err.message });
            res.status(201).json({ message: "User registered successfully", user: registeredUser });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Login Route
app.post("/loginn", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed", error: err.message });

            // ✅ Manually save session before sending response
            req.session.save((err) => {
                if (err) return res.status(500).json({ message: "Session save failed", error: err.message });

                console.log("✅ Login successful. Session ID:", req.sessionID);
                return res.status(200).json({ message: "Login successful", user });
            });
        });
    })(req, res, next);
});

// Check If User is Logged In
app.get("/user", (req, res) => {
    console.log("🔹 Session Data:", req.session);
    console.log("🔹 Full User Data:", req.user);
    console.log("🔹 isAuthenticated:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "User is not logged in" });
    }

    res.json({ user: req.user });
});
