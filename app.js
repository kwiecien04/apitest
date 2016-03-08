var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();
var storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'./uploads')
},
filename:function(req,file,cb){
    cb(null, Date.now() + file.originalname)
}
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
app.post("/upload", multer({storage:storage}).array("uploads[]", 12), function(req, res) {
    res.send(req.files);
    console.log(req.files)
});
 
var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});
