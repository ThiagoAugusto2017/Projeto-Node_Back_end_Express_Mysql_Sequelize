// //* este metodos ele reutiliza as query ja utilizadas e tras autonomia e rapidez,
// //* ela facilita a conexao e fechas as rotas nao utilizadas

const {
  Sequelize
} = require("sequelize") // estamos importando so o sequelize


//* Criação do banco de dados e conexao  Nome do banco de dados 'NODEMONSEQUELIZE2'
const sequelize = new Sequelize("NODEMONSEQUELIZE2", 'root', '', { // fazendo a conexao com o banco

  host: 'localhost', // aqui esta como local
  dialect: 'mysql', // tipo do banco

}); // dados do banco de dados


module.exports = sequelize // montamos a exportação da conexão
