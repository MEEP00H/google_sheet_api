//npm i -D nodemon watching when file change only develop
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const handlebars = require("express-handlebars");
const users = require("./Users");

const app = express();

//Handles Middleware
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HomePage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Users App",
    users,
  });
});

//Init Middleware
// app.use(logger);

//create route to root
// app.get("/", (req, res) => {
//   //   res.send("Hello , Express");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
//   //__dirname find path anything
// });
// ------------

//use router api
app.use("/api/users", require("./routes/api/users"));
app.use("/api/sheety", require("./routes/api/sheety"));
// Set Static folder
// app.use(express.static(path.join(__dirname, "public")));
// -------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
