var express = require("express");
var app = express();
app.use(express.static("css"));
app.use(express.static("script"));
app.use(express.static("img"));
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b8346244e11f19",
    password: "a98e2058",
    database: "heroku_1bf6e48e5fa9411"
});

var port = process.env.PORT || 3000;


app.get("/", function(req, res){
    connection.query("SELECT * FROM tablica1", function(err, rezultat){
        if(err) throw err;
        res.render("index.ejs", {rezultat: rezultat});
    });
});



app.listen(port, function(){
    
});