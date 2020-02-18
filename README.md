# Upload de Arquivos com API NodeJs
### neste e exemplo de upload vou utilizar uma aplicação simples em NodeJs como back-end e  Reactjs com cliente. Mas enfim sem enrolação vamos “codar” 
<img src="https://i.pinimg.com/originals/fb/d6/36/fbd636d695a9c16d1a24cb850241f943.gif" />

##### Bom vamos criar nosso “server.js” uma forma bem simples, tudo em um arquivo só mesmo, para não ficar confuso, antes de criar o server, vamos instalar algumas dependências.

`
  1° - npm install express --save
`

`
  2°-  npm install connect-multiparty --save
 `
 ##### Depois de tudo instalado, crie seu <i>server.js</i> , dentro dele vai ficar mais ou menos assim:
 
 ```
 
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

 ```
 ##### Obs.: Não esqueça de criar na raiz do seu projeto, a pasta <i>Uploads</i>, feito tudo isso de o `npm install` caso tenha clonado meu projeto.
 ##### Bom para testarmos vamos criar nosso app no React.js para podermos fazer o Upload.
 ```
 npx create-react-app app-react
 npm install axios --save 
 cd app-react
 npm start

```
##### Nosso <i>App.js</i>  deverá ficar mais ou menos assim: 

```

import React from 'react'
import axios, { post } from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // pausa form - submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:3030/api/upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>upload de arquivos</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Enviar</button>
      </form>
   )
  }
}

export default App

```

#### legal isso é nosso arquivo principal, algo bem simples, dê uma estudada em cada linha, para você realmente entender o negócio. 👨🏽‍💻
#### Se tudo deu 100% certo starta seu node server e seu cliente React, faça um upload e veja os arquivos caírem na pasta uploads 

<img src="https://media2.giphy.com/media/S3Ot3hZ5bcy8o/giphy.gif" />
#### Vou estar deixando o código backEnd e o FrontEnd para clone, então 
