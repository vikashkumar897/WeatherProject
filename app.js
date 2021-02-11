const { response } = require("express");
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){
    var query=req.body.weatherLocation;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=1b5e9100866e11b94a2ab322c931cf12&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            var wdata=JSON.parse(data);
            var icon="http://openweathermap.org/img/wn/"+ wdata.weather[0].icon +"@2x.png";
            res.write("<body style='background-color: #645A58;color:white;text-align:center'><h1>Temprature in "+ query +" is "+wdata.main.temp+"</h1><img src="+icon+"></body>");
            res.send();
        })
    })
    
})








app.listen(3000,function(req,res){
    console.log("Server started..");
})