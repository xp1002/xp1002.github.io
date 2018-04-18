
var sqlite3 = require("sqlite3").verbose();  // use sqlite
var dbFile = "photos.db";

// makes the object that represents the database in our code
var db = new sqlite3.Database(dbFile);

// If not, initialize it
var cmdStr = "CREATE TABLE PhotoLabels (fileName TEXT UNIQUE NOT NULL PRIMARY KEY, labels TEXT, favorite INTEGER)"

db.run(cmdStr);
