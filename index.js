const express = require('express');
const app     = express();

const formation = require("./routers/formation");

app.use(express.json());

app.use("/formations", formation);


app.listen(8080, () => {
    console.log('Oui allo ? J\'écoute');
});