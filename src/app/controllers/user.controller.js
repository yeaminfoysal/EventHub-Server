const express = require("express");
const User = require("../models/user.model");
const crypto = require("crypto");

const userRoutes = express.Router();

// Fake JWT implementation using HMAC + crypto
function generateToken(user) {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");

    const payload = Buffer.from(
        JSON.stringify({ username: user.username, name: user.name })
    ).toString("base64url");

    const secret = process.env.SECRET || "mysecret";

    const signature = require("crypto")
        .createHmac("sha256", secret)
        .update(`${header}.${payload}`)
        .digest("base64url");

    return `${header}.${payload}.${signature}`;
}



function verifyToken(token) {
    const [header, payload, signature] = token.split(".");
    const secret = process.env.SECRET || "mysecret";
    const validSignature = crypto
        .createHmac("sha256", secret)
        .update(`${header}.${payload}`)
        .digest("base64url");

    if (signature !== validSignature) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString());
}

// Register
userRoutes.post("/register", async (req, res) => {
    const { name, username, password } = req.body;
    console.log(req);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = new User({ name, username });
    user.setPassword(password);
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
        success: true,
        token,
        user: { name: user.name, username: user.username },
    });
});


// Login
userRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({
        success: true,
        token,
        user: { name: user.name, username: user.username },
    });
});


// Protected example route
userRoutes.get("/profile", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const userData = verifyToken(token);
    if (!userData) return res.status(401).json({ success: false, message: "Invalid token" });

    res.json({ success: true, message: "Welcome!", user: userData });
});

module.exports = { userRoutes };
