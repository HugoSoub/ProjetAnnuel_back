const express = require('express');
const mysql   = require('mysql');
const app     = express();

app.use(express.json());

// Connection à la Base de donnée Mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet_annuel",
});

// Test de la connection :
db.connect(function(err) {
    if (err) throw err;
    console.log("Connection établie avec MySql ! ");
});

// Récupérer les certifications
app.get();

// Insérer une certification
app.post();

// Modifier une certification
app.put();

// Supprimer une certification
app.delete();