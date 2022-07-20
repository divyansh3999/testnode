const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes/PublicRoutes");

const PORT = 5500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});

db.sequelize.sync().then(() => {
    console.log("database connected");
});
