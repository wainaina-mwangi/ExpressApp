const express = require("express");
const port = 8000;
const app = express();


app.get("/",(req,res)=>{
    res.send('Hello world and welcome to ExpressJs');
});


app.get("/api/plan/:planName", (req, res) => {
    
    const { planName } = req.params; 
    
    res.send(`You are viewing details for the ${planName} internet speed bundle.`);
});


app.listen(port,()=>{
   console.log( `app runs on http://localhost:${port} `);
});