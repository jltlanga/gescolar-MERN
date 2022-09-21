const mongoose = require('mongoose');

const conexao = 'mongodb+srv://stxpservicio:prueba1234@cluster0.7h4pr.mongodb.net/G_Escolar?retryWrites=true&w=majority';

const connection = mongoose.connect(conexao,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', function () {
    console.log('Connected to Database '+'G_Escolar');
  });

module.exports = connection;