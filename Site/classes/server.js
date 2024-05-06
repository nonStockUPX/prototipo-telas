const mysql = require('mysql');
const express = require('express');
const body_parser = require('body-parser');
const encoder = body_parser.urlencoded();
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "usbw",
    database: "nonStock",
    insecureAuth: true
});

connection.connect(function(error){
    if(error) throw error
    else console.log("Connected to the database successfully!");
});

app.get("/", function(req, res){
    res.sendFile("C:/Users/augus/Documents/Projetos VSCode/Projeto UPX III/prototipo-telas/Site/login.html");
});

app.listen(4500);