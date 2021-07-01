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
    db.query("SELECT * FROM user", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer un user
app.get('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of user is null";
    }

    var id = parseInt(req.params.id);
    db.query("SELECT * FROM user WHERE id=" + id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Récupérer un type de user
app.get('/roles/:roles', (req, res) => {
    if (req.params.roles == null){
        res.status(500);
        throw "id of user is null";
    }

    db.query("SELECT * FROM user WHERE roles=" + req.params.roles, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Insérer une user
app.post('/', (req, res) => {
    if (req.body.name == null){
        res.status(500);
        throw "name of user is null";
    }
    if (req.body.firstname == null){
        res.status(500);
        throw "firstname of user is null";
    }
    if (req.body.email == null){
        res.status(500);
        throw "email of user is null";
    }
    if (req.body.roles == null){
        res.status(500);
        throw "roles of user is null";
    }

    db.query("INSERT INTO user (name, firstname, email, roles) VALUES ('" + req.body.name + "', '" + req.body.firstname +"', '" 
    + req.body.email +"', '" 
    + req.body.roles  +"')", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Modifier une user
app.put('/:id', (req, res) => {
    if (req.params.id == null){
        res.status(500);
        throw "id of user is null";
    }
    if (req.body.name == null){
        res.status(500);
        throw "name of user is null";
    }
    if (req.body.firstname == null){
        res.status(500);
        throw "firstname of user is null";
    }
    if (req.body.email == null){
        res.status(500);
        throw "email of user is null";
    }
    if (req.body.roles == null){
        res.status(500);
        throw "roles of user is null";
    }

    db.query("UPDATE user SET name='" + req.body.name + "', firstname='" + req.body.firstname +"', email='" 
    + req.body.email +"', roles='" 
    + req.body.roles  +"' WHERE id=" + req.params.id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Supprimer une user
app.delete('/:id', (req, res) => {
    
    if (req.params.id == null){
        res.status(500);
        throw "id of user is null";
    }
    var id = parseInt(req.params.id);
    db.query("DELETE FROM user WHERE id="+ id, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })
});

module.exports = app;