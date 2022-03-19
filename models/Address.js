//Todo - criamos mais uma js pois estamos criando mais uma tabela
//Todo - a mesma sera relacionada com a outra tabela ja criada "USER"


const {
  DataTypes
} = require('sequelize') // puxamos todos os dados do banco de dados

const db = require('../db/conn'); // puxamos conexao com o banco

const User = require('./User'); // como sera relacionada temos que puxar a mesma ser
// como iriamos saber o id que sera a chave para as duas tabelas se relacionarem

const Address = db.define('Address', { // aqui sao os dados que vamos criar na tabela
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
});

//*hasMany=> aqui fechamos a ponta que o usuario tem varios endereço mas so um e relacionado a ele
User.hasMany(Address)

//*belongsTo=> metodo de relacionar tabelas
Address.belongsTo(User) // aqui sera criado a relação das duas table
module.exports = Address
