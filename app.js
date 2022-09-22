

// associar as dependências instaladas
const express = require('express');
// inicializar app express
const app = express();
const bodyParser = require('body-parser');
require('./conexao');

// ‘END POINT INVÁLIDO!’
app.get('/', function(req, res){
    res.send('END POINT INVÁLIDO!');
  });

// este middleware deve estar acima das routes-handlers!
app.use(bodyParser.json());

  // todo o url começado por ‘/api’ chama as rotas em ‘./routes/api’
  const Estudantes = require('./routes/alumno');
  const Docente = require('./routes/professor'); 
  const Turno = require('./routes/Turma');
  app.use('/alumno', Estudantes);
  app.use('/professor', Docente);
  app.use('/Turma', Turno);


let port = 5000;
// servidor á escuta no porto 5000
// 'process.env.port': caso usemos Heroku
app.listen(process.env.port || port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});



