const express = require('express');
const mysql   = require('mysql');
const app     = express();

app.use(express.json());

// Connection à la Base de donnée Mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "base_test",
});

// Test de la connection :
db.connect(function(err) {
    if (err) throw err;
    console.log("Connection établie avec MySql ! ");
});


app.get('/test_1', (req,res) => {
    db.query("SELECT test_1 FROM test", function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    });
});

app.post('/test_1', (req, res) => {
    console.log(req.body);
});

app.listen(8080, () => {
    console.log('Oui allo ? J écoute');
});