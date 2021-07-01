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

// Récupérer les user_sessions
app.get('/', (req, res) => {
    db.query("SELECT * FROM user_session", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer un user_session
app.get('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of user_session is null";
    }

    var id = parseInt(req.params.id);
    db.query("SELECT * FROM user_session WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une user_session
app.post('/', (req, res) => {
    if (req.body.id_user == null){
        res.status(500);
        throw "id_user of user_session is null";
    }
    if (req.body.id_session == null){
        res.status(500);
        throw "id_session of user_session is null";
    }

    db.query("INSERT INTO user_session (id_user, id_session) VALUES (" + req.body.id_user + ", " +
     req.body.id_session + ")", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Modifier une user_session
app.put('/:id', (req, res) => {
    if (req.body.id_session == null){
        res.status(500);
        throw "id_session of formation is null";
    }
    if (req.params.id == null){
        res.status(500);
        throw "id of user_session is null";
    }
    if (req.body.id_user == null){
        res.status(500);
        throw "id_user of user_session is null";
    }

    var id = parseInt(req.params.id);
    db.query("UPDATE user_session SET id_session=" + req.body.id_session + ", id_user=" + req.body.id_user 
    + " WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Supprimer une user_session
app.delete('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of user_session is null";
    }

    var id = parseInt(req.params.id);
    db.query("DELETE FROM user_session WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;