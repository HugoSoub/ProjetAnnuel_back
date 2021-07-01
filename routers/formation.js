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

// Récupérer les formations
app.get('/', (req, res) => {
    db.query("SELECT * FROM formation", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Insérer une formation
app.post('/', (req, res) => {
    if (req.body.name != null){
        db.query("INSERT INTO formation (name) VALUES ('" + req.body.name + "')", function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    }else{
        throw "name of formation is null";
    }
});

// Modifier une formation
app.put('/:id', (req, res) => {
    if (req.body.name != null){
        if (req.params.id != null){
            var id = parseInt(req.params.id);
            db.query("UPDATE formation SET name='" + req.body.name + "' WHERE id=" + id, function(err, result){
                if (err) throw err;
                res.status(200).json(result);
            })
        }else{
            throw "id of formation is null";
        }
    }else{
        throw "name of formation is null";
    }
});

// Supprimer une formation
app.delete('/:id', (req, res) => {
    if (req.params.id != null){
        var id = parseInt(req.params.id);
        db.query("DELETE formation WHERE id="+ id, function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    }else{
        throw "id of formation is null";
    }

});

module.exports = app;