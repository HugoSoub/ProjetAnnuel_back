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

// Récupérer les session_formations
app.get('/', (req, res) => {
    db.query("SELECT * FROM session_formation WHERE date IS NOT NULL", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une session_formation
app.get('/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM session_formation WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une session_formation à partir de la session
app.get('/session/:id', (req, res) => {
    var id = parseInt(req.params.id);
    // On fonctionne en id_session si on veut filtrer par session_formation de la même session
    db.query("SELECT * FROM session_formation WHERE id_session=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Insérer une session_formation
app.post('/', (req, res) => {
    if (req.body.date == null){
        res.status(500);
        throw "date of session_formation is null";
    }
    if (req.body.id_session == null){
        res.status(500);
        throw "id_session of session_formation is null";
    }
    if (req.body.id_formation == null){
        res.status(500);
        throw "id_formation of session_formation is null";
    }
    db.query("INSERT INTO session_formation (date, id_formation, id_session) VALUES ('"
        + req.body.date + "', " + req.body.id_formation + ", " + req.body.id_session + ")", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Modifier une session_formation
app.put('/:id', (req, res) => {
    if (req.body.date == null){
        res.status(500);
        throw "date of session_formation is null";
    }        
    if (req.body.id_session == null){
        res.status(500);
        throw "id_session of session_formation is null";
    }
    if (req.body.id_formation == null){
        res.status(500);
        throw "id_formation of session_formation is null";
    }
    if (req.params.id == null){
        res.status(500);
        throw "id of session_formation is null";
    }          

    var id = parseInt(req.params.id);
    db.query("UPDATE session_formation SET date='" + req.body.date + "', id_session=" + req.body.id_session + ", id_formation=" + req.body.id_formation + " WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })

});

// Supprimer une session_formation
app.delete('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of session_formation is null";
    }

    var id = parseInt(req.params.id);
    db.query("DELETE FROM session_formation WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;