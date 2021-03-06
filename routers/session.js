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

// Récupérer les sessions
app.get('/', (req, res) => {
    db.query("SELECT * FROM session", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une session
app.get('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of session is null";
    }

    var id = parseInt(req.params.id);
    db.query("SELECT * FROM session WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une session
app.get('/status/:status', (req, res) => {
    if (req.params.status == null){
        res.status(500);
        throw "status of session is null";
    }
    db.query("SELECT * FROM session WHERE status='" + req.params.status + "'", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une session
app.post('/', (req, res) => {
    if (req.body.name == null){
        res.status(500);
        throw "name of session is null";
    }
    if (req.body.status == null){
        res.status(500);
        throw "status of session is null";
    }

    db.query("INSERT INTO session (name, status) VALUES ('" + req.body.name + "', '" + req.body.status + "')", function(err, result){
        if (err) throw err;
        if (req.body.id_formation == null){
            res.status(200).json(result);
        }
    })

    db.query("SELECT id FROM session WHERE name='" + req.body.name + "'", function(err, result){
        if (err) throw err;

        var id_session = result[0].id;

        res.setHeader('Content-Type', 'text/json');

        for(var i = 0; i < 3; i++){
            db.query("INSERT INTO session_formation (id_formation, id_session) VALUES (" 
            + req.body.id_formation + "," + id_session +")", function(err, result){
                if (err) throw err;})
        }
        res.status(200).json(result);
    })    
});

// Modifier une session
app.put('/:id', (req, res) => {
    if (req.body.name == null){
        res.status(500);
        throw "name of session is null";
    }
    if (req.params.id == null){
        res.status(500);
        throw "id of session is null";
    }

    var id = parseInt(req.params.id);
    db.query("UPDATE session SET name='" + req.body.name + "' WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

// Supprimer une session
app.delete('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of session is null";
    }

    var id = parseInt(req.params.id);
    db.query("DELETE FROM session WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;