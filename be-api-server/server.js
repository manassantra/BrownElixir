const express = require('express'),
      server = express(),
      cors = require('cors'),
      bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});


// create server
server.listen(3000, ()=>{
    console.log("Server listening...");
})