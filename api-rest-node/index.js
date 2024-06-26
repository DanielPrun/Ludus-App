const {connexio} = require("./database/connexio");
const express = require("express");
const cors = require("cors");

connexio();

//crear servidor node
const app = express();
const puerto = 3900;

app.use(cors());

//convertir el que m'arribi com a body a objecte js
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const rutes_article = require("./routes/Article");
const rutes_user = require("./routes/user");
const rutes_publi = require("./routes/publication");
const rutes_follow = require("./routes/follow");
const rutes_ex = require("./routes/exercici");
const rutes_sessio = require("./routes/sessio");
const rutes_model = require("./routes/model");
const rutes_horari = require("./routes/horari");

app.use("/api", rutes_article);
app.use("/api/user", rutes_user);
app.use("/api/publi", rutes_publi);
app.use("/api/follow", rutes_follow);
app.use("/api/ex", rutes_ex);
app.use("/api/sessio", rutes_sessio);
app.use("/api/model", rutes_model);
app.use("/api/horari", rutes_horari);

app.listen(puerto, () => {
    console.log("servidor on");
});