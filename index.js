const express = require('express');
const app     = express();

const formation         = require("./routers/formation");
const certification     = require("./routers/certification");
const session           = require("./routers/session");
const session_formation = require("./routers/session_formation");
const user              = require("./routers/user");

app.use(express.json());

app.use("/formations"        , formation);
app.use("/certifications"    , certification);
app.use("/sessions"          , session);
app.use("/session_formations", session_formation);
app.use("/users"             , user);


app.listen(8080, () => {
    console.log('Oui allo ? J\'écoute');
});