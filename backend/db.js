const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aman@1108",  // <---- PUT YOUR MYSQL PASSWORD HERE
    database: "userdb"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ MySQL Connected");
});

module.exports = db;
