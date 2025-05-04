"use strict";
const db = require("./db-conn"); 

const createUser = (name, email, password = null, userType = 'shopper', googleId) => {
    const now = new Date().toISOString();
    const stmt = db.run("INSERT INTO Users (created_at, updated_at, user_name, user_email, user_password, user_type, google_id) VALUES (?, ?, ?, ?, ?, ?, ?);", now, now, name, email, password, userType, googleId);
};

const getUserByEmail = (email) => {
    const stmt = db.get("SELECT * FROM Users WHERE user_email = ?;", email);
    if (!stmt) {
        console.error("User not found by email:", email);
    }
    return stmt;
};

function getUserById(id) {
    let sql = "SELECT * FROM Users WHERE user_id = ?;"; 
    const item = db.get(sql, id);
    if (!item) {
        console.error("User not found by ID:", id);
    }
    return item;
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};