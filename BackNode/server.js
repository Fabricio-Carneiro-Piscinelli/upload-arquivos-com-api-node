var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3030;
  
var router = express.Router();

app.use('/api', router);
  router.route('/upload').post(multiparty(), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var arquivo = req.files.file;
    var temporario = req.files.file.path;
    var novo = './uploads/' + req.files.file.name;
    fs.rename(temporario, novo, function(err){
      if(err){
        res.status(500).json({error: err})
      }
      res.json({ message: "enviado com sucesso.", file: novo });
    })
  });
  
app.listen(port, () => {
  console.log("server ok!")
});