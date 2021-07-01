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

// Récupérer les formations
app.get('/', (req, res) => {
    db.query("SELECT * FROM formation", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une formation
app.get('/:id', (req, res) => {
    if (req.params.id != null){
        res.status(500);
        throw "id of formation is null";
    }

    var id = parseInt(req.params.id);
    db.query("SELECT * FROM formation WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une formation
app.post('/', (req, res) => {
    if (req.body.name != null){
        res.status(500);
        throw "name of formation is null";
    }

    db.query("INSERT INTO formation (name) VALUES ('" + req.body.name + "')", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Modifier une formation
app.put('/:id', (req, res) => {
    if (req.body.name != null){
        res.status(500);
        throw "name of formation is null";
    }
    if (req.params.id != null){
        res.status(500);
        throw "id of formation is null";
    }

    var id = parseInt(req.params.id);
    db.query("UPDATE formation SET name='" + req.body.name + "' WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Supprimer une formation
app.delete('/:id', (req, res) => {
    if (req.params.id != null){
        res.status(500);
        throw "id of formation is null";
    }

    var id = parseInt(req.params.id);
    db.query("DELETE FROM formation WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;