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
    var id = parseInt(req.params.id);
    db.query("SELECT * FROM certification WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});


// Insérer une certification
app.post('/', (req, res) => {
    if (req.body.name != null){
        if (req.body.description != null){
            db.query("INSERT INTO certification (name, description) VALUES ('" + req.body.name + "', '" + req.body.description + "')",
             function(err, result){
                if (err) throw err;
                res.status(200).json(result);
            })
        }else{
            throw "description of certification is null";
        }
    }else{
        throw "name of certification is null";
    }
});

// Modifier une certificaiton
app.put('/:id', (req, res) => {
    if (req.body.name != null){
        if (req.body.description != null){
            if (req.params.id != null){
                var id = parseInt(req.params.id);
                db.query("UPDATE certification SET name='" + req.body.name + "', description='" + req.body.description + "' WHERE id=" + id, function(err, result){
                    if (err) throw err;
                    res.status(200).json(result);
                })
            }else{
                throw "id of certification is null";
            }
        }else{
            throw "description of certification is null";
        }
    }else{
        throw "name of certification is null";
    }
});

// Supprimer une certification
app.delete('/:id', (req, res) => {
    if (req.params.id != null){
        var id = parseInt(req.params.id);
        db.query("DELETE FROM certification WHERE id="+ id, function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    }else{
        throw "id of certification is null";
    }

});

module.exports = app;