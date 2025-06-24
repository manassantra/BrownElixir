const express = require('express'),
      server = express(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      baseApi = require('./routes/baseApi');
require('dotenv').config({path: '.env'});

// PORT & HOST config
const port = process.env.PORT;
const host = process.env.HOST;

// parse body json format & config cors-policy
server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
    extended: false,
  }));
const corsList = { 
  origin: process.env.ORIGIN
};
server.use(cors(corsList));


// DataBase Config
mongoose
  .connect(process.env.DB_URL)
  .then((x) => {
    console.log(
      `Connected to : MongoDB-${x.connections[0].name}`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
});

// API config
server.use("/api", baseApi);

// create server
server.listen(port, ()=>{
    console.log("Server listening on port : " + port);
    console.log("Webserver Url : " + host+':'+port);
})