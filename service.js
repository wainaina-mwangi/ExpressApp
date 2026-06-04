const express = require("express");
const port = 8000;
const app = express();


app.get("/",(req,res)=>{
    res.send('Hello world and welcome to ExpressJs');
});


app.listen(port,()=>{
   console.log( `app runs on http://localhost:${port} `);
});