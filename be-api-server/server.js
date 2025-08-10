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
const origin = process.env.ORIGIN?process.env.ORIGIN : '*';
const methods = process.env.METHODS?process.env.METHODS
                .replace(/[\[\]']+/g, '')
                .split(',')
                .map(method => method.trim()) : '*';

// public static server
server.use('/public', express.static('public'));

// parse body json format & config cors-policy
server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
    extended: false,
}));
const corsOptions = {
  origin: origin,
  credentials: true,
  methods: methods,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-api-secret',
    'x-api-key'
  ]
};

server.use(cors(corsOptions));

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
server.use("/test", (req, res)=>{
  try {
    res.send({code: 200, message: "Server is up & running..."});
  } catch(err) {
    res.send({code: err.statusCode, message: err.message, error: err.error});
  }
});
server.use("/api", baseApi);

// create server
server.listen(port, ()=>{
    console.log("Server listening...");
    console.log("Web-API-server Url : " + host+':'+port);
})