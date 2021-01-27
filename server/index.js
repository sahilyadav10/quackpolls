require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
const http = require("http");

const pollRoutes = require("./routes/polls");
const resultsRoutes = require("./routes/results");
const publicPollsRoutes = require("./routes/publicpolls");

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error->"));
db.once("open", () => {
  console.log("Database Connected!!");
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  if (req.get("X-Forwarded-Proto") == "https" || req.hostname == "localhost") {
    // if https request
    next();
  } else {
    // if http request, redirect to https
    res.redirect("https://" + req.headers.host + req.url);
  }
});

const allowlist = ["http://localhost:3000"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });
wss.on("connection", (ws, req) => {
  console.log(req.url.substr(6))
  app.locals.clients = wss.clients;
});

app.use(express.static(path.join(__dirname, '/build')));

app.use("/poll", cors(corsOptionsDelegate), pollRoutes);
app.use("/results", cors(corsOptionsDelegate), resultsRoutes);
app.use("/public", cors(corsOptionsDelegate), publicPollsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.all("*", (req, res, next) => {
  res.send("404");
});

app.use((err, req, res, next) => {
  const { statusCode = 500} = err;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    if(!err.message) err.message = 'Quack, Something Went Wrong'; 
  } else {
    err.message = 'Quack, Something Went Wrong';
  }   
  res.status(statusCode).send(err.message); 
  next();
}); 

server.listen(PORT, () => {
  console.log(`Server working on port: ${PORT}!!`);
});