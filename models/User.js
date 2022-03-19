//Todo - cada tabela tera o seu models que criara uma tabela no
//Todo - banco de dados


const {
  DataTypes
} = require('sequelize') // puxamos todos os dados do banco de dados

const db = require('../db/conn'); // puxamos conexao com o banco


//* estamos criando as tabela do banco de dados
const User = db.define('User', { //vamos definir o modulo que sera criado no banco de dados

  name: { //! coluna name
    type: DataTypes.STRING, //criamos somente string
    allowNull: false //nao aceitamos dados null
  },
  occupation: { //! coluna ocupação
    type: DataTypes.STRING, //criamos somente string
    riquired: true //este metodo nao aceita nada vazio
  },
  newsletter: { //! coluna noticias
    type: DataTypes.BOOLEAN, //criamos somente boolean

  }
});

module.exports = User
