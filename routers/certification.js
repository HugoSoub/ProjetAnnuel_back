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

// Récupérer les certifications
app.get('/', (req, res) => {
    db.query("SELECT * FROM certification", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une certification
app.get('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of certification is null";
    }

    var id = parseInt(req.params.id);
    db.query("SELECT * FROM certification WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une certification
app.post('/', (req, res) => {
    if (req.body.name == null){
        res.status(500);
        throw "name of certification is null";
    }
    if (req.body.description == null){
        res.status(500);
        throw "description of certification is null";
    }

    db.query("INSERT INTO certification (name, description) VALUES ('" + req.body.name + "', '" + req.body.description + "')",
        function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Modifier une certificaiton
app.put('/:id', (req, res) => {
    if (req.body.name == null){
        res.status(500);
        throw "name of certification is null";
    }
    if (req.body.description == null){
        res.status(500);
        throw "description of certification is null";
    }
    if (req.params.id == null){
        res.status(500);
        throw "id of certification is null";
    }

    var id = parseInt(req.params.id);
    db.query('UPDATE certification SET name="' + req.body.name + '", description="' + req.body.description + '" WHERE id=' + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Supprimer une certification
app.delete('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of certification is null";
    }

    var id = parseInt(req.params.id);
    db.query("DELETE FROM certification WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;