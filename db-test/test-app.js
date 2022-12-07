/********************************************/
// Author: Elayne Trimble
// Description:
// This is a test node.js app to try out the sqlite database
/********************************************/
// How to run:
// Required: nodejs
//
// In your terminal:
// cd db-test
// node test-app.js
//
// Open the link http://localhost:8080/ to see "hello world!"
/********************************************/
// Links:
// nodejs start app used: https://www.w3schools.com/nodejs/nodejs_get_started.asp
// Why SQLite?: https://www.sqlite.org/serverless.html & https://www.sqlite.org/onefile.html

/********************************************/
// SQLite:
// SQLite is a serverless database which uses the SQL language
// This is very convient to us, as we don't have to host a DB server
//
// This is what the previous team used as well
//
// The file testdb.db in this same directory holds the database which 
// I edited using DB Browser for SQLite. 
/********************************************/

const sqlite3 = require('sqlite3').verbose(); // import the sqlite module
// Connect to the SQLite file saved in the same folder
let db = new sqlite3.Database('./testdb.db', (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log('Connected to the sqlite database');
});

// Run an SQL query to get the pet and the owner
db.serialize(() => {
    db.each(`SELECT person.Name AS personName, pet.Name AS petName, pet.Type AS Type 
            FROM pet 
            INNER JOIN person ON pet.OwnerID = person.ID;`, 
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      // row is the select query result obj
      console.log(row.personName + "\t" + row.petName + "\t" + row.Type);
    });
});

function makeRandName(){
    var names = ["Mitchel", 'Matthew', 'Sonjay', 'Gaven', 'Evan'];
    return names[Math.floor(Math.random() * 4)];
}

// Testing Insert into the database
db.run(`INSERT INTO person (Name) VALUES (?)`, [makeRandName()], (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ` + this.lastID); //cant get this line to work
});

// Testing to see if it's updated 
db.serialize(() => {
    db.each(`SELECT * FROM person`, 
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      // row is the select query result obj
      console.log(row.ID + "\t" + row.Name);
    });
});

// Connect to local host on port 8080
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
