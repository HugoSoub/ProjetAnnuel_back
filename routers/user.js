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
});

// Récupérer les users
app.get('/', (req, res) => {
});

// Récupérer un user
app.get('/:id', (req, res) => {
});

// Récupérer un type de user
app.get('/:roles', (req, res) => {
});

// Insérer une user
app.post('/', (req, res) => {
});

// Modifier une user
app.put('/:id', (req, res) => {
});

// Supprimer une user
app.delete('/:id', (req, res) => {
});

module.exports = app;