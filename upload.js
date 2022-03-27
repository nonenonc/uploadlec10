var http = require("http");
var express = require("express");
var fs = require("fs");
var upload = require("express-fileupload");
var PORT = process.env.PORT || 3000;

var app = express();

let list_files = [];

/*function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}*/

app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req, res) => {
  if (req.files) {
    console.log(req.file);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
    //console.log(req)
    var get_fulldate = Date.now();
    var path = "./uploads/" + get_fulldate;
    fs.mkdir(path, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    });

    file.mv(path + "/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        //res.send("File Uploaded!!, Back to see where iare your pic");
        list_files.push(path + "/" + filename);
        res.send(
          '<script>alert("File Uploaded"); window.location.href = "/"; </script>'
        );
      }
    });
  }
});
app.get("/list_files", (req, res) => {
  res.send(list_files);
});

app.listen(PORT);
