import mysql from 'mysql2';

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "dev",
});

db.connect((err)=>{
    if(err){
        console.log("not connect",db);
    } else{
        console.log("Database connect");
    }
});

export default db;