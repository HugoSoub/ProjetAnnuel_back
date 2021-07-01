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

// Récupérer les sessions
app.get('/', (req, res) => {
    db.query("SELECT * FROM session", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer une session
app.get('/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM session WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une session
app.post('/', (req, res) => {
    if (req.body.id_certification != null){
        db.query("INSERT INTO session (id_certification) VALUES ('" + req.body.id_certification + "')", function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    }else{
        throw "id_certification of session is null";
    }
});

// Modifier une session
app.put('/:id', (req, res) => {
    if (req.body.id_certification != null){
        if (req.params.id != null){
            var id = parseInt(req.params.id);
            db.query("UPDATE session SET id_certification=" + req.body.id_certification + " WHERE id=" + id, function(err, result){
                if (err) throw err;
                res.status(200).json(result);
            })
        }else{
            throw "id of session is null";
        }
    }else{
        throw "id_certification of session is null";
    }
});

// Supprimer une session
app.delete('/:id', (req, res) => {
    if (req.params.id != null){
        var id = parseInt(req.params.id);
        db.query("DELETE FROM session WHERE id="+ id, function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    }else{
        throw "id of session is null";
    }

});

module.exports = app;