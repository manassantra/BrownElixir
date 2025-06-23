const express = require('express'),
      server = express(),
      cors = require('cors'),
      bodyParser = require('body-parser');


// create server
server.listen(3000, ()=>{
    console.log("Server listening...");
})