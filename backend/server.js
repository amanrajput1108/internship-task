const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Aman@1108", // 👉 Put your MySQL password here (if any)
    database: "userdb"
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Database Connected!");

    db.query("SHOW TABLES", (err, result) => {
    console.log("📌 Tables in DB:", result);
  });
});

// ✅ API: Register User
app.post("/api/register", (req, res) => {
    const { fullName, email, password, phone } = req.body;

    // ✅ Validation
    if (!fullName || !email || !password || !phone) {
        return res.json({ success: false, message: "⚠ All fields are required!" });
    }

    if (password.length < 6) {
        return res.json({ success: false, message: "⚠ Password must be at least 6 characters!" });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.json({ success: false, message: "⚠ Phone must be a 10-digit number!" });
    }

    // ✅ Hash Password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = "INSERT INTO users (fullName, email, password, phone) VALUES (?, ?, ?, ?)";

    // ✅ Updated Duplicate Email Check Code (Copy-Paste version)
    db.query(sql, [fullName, email, hashedPassword, phone], (err, result) => {
        if (err) {
            // Check if email already exists
            if (err.code === "ER_DUP_ENTRY") {
                return res.json({ success: false, message: "❌ Email already exists!" });
            }

            console.error("Database Error:", err);
            return res.json({ success: false, message: "⚠ Server error. Try again later!" });
        }

        return res.json({ success: true, message: "✅ Registration successful!" });
    });
});

// ✅ Server Running
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
