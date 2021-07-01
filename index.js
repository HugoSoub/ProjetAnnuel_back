const express = require('express');
const app     = express();

const formation     = require("./routers/formation");
const certification = require("./routers/certification");

app.use(express.json());

app.use("/formations", formation);
app.use("/certifications", certification);


app.listen(8080, () => {
    console.log('Oui allo ? J écoute');
});