// ---------------------- IMPORTS ----------------------
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// ---------------------- APP CONFIG -------------------
const app = express();
app.use(cors());
app.use(express.json());

// ---------------------- DATABASE CONNECTION ----------
const db = mysql.createConnection({
    host: "localhost",
    user: "root",        // ✅ change if your MySQL user is different
    password: "Aman@1108",  // ✅ put your MySQL password
    database: "userdb"       // ✅ your database name
});

// Testing DB connection
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Database connected successfully");
    }
});

// ---------------------- API ROUTE --------------------
app.post("/register", (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if email already exists
    const checkEmail = "SELECT email FROM users WHERE email = ?";
    db.query(checkEmail, [email], (err, result) => {
        if (err) return res.status(500).json({ message: "DB error!", error: err });

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";

        db.query(sql, [name, email, password, phone], (err, result) => {
            if (err) {
                console.log("Insert Error:", err);
                return res.status(500).json({ message: "Server error", error: err });
            }

            res.json({ message: "User registered successfully!" });
        });
    });
});

// ---------------------- SERVER START -----------------
app.listen(5000, () => {
    console.log("✅ Server running on port 5000");
});
