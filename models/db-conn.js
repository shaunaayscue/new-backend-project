"use strict";

let sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.join(__dirname, "../.data", "bookstore.db"));

function all(sql, ...params) {
    return db.prepare(sql).all(...params); 
}

function get(sql, ...params) {
    return db.prepare(sql).get(...params);
}

function run(sql, ...params) {
    return db.prepare(sql).run(...params); 
}

function exec(sql) {
    return db.exec(sql);
}

function db_close() {
    console.log("...Closing database connection.")
    db.close();
}

module.exports = {
    all,
    get,
    run,
    exec,
    db_close
};