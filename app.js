var express = require("express");
var app = express();
app.use(express.static("css"));
app.use(express.static("script"));
app.use(express.static("img"));
app.use(express.static("zupanije"));
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b8902d98960762",
    password: "b5a62eba",
    database: "heroku_98cc2bd9cae74dc"
});

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "nodeJS220!",
//     database: "karta"
// });

var port = process.env.PORT || 3000;


app.get("/", function(req, res){
    connection.query("SELECT * FROM tablica1", function(err, rezultat){
        if(err) throw err;
        res.render("index.ejs", {rezultat: rezultat});
    });
});



app.listen(port, function(){
    
});