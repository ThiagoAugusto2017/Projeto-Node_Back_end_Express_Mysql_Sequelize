const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn') // conectamos com o arquivo

const User = require('./models/User'); // importando a mondel para o index, ele
// analisa se tem tabelas para criar e atualizar
const Address = require('./models/Address'); //importamos os dados desta tabela para
// sera criada na primiro start e atualizada ataves dos metods


//Todo - este sequelize temos que instalar o pacote do mtsql2 para funcionar


const app = express();

app.use(
  express.urlencoded({ // para pegarmos o bory

    extended: true,
  })
);

app.use(express.json()) // para pegar o bory em JSON

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.use(express.static('public'));




//* rota para o create adduser
app.get('/users/create', (req, res) => {
  res.render('adduser')
});

//* criamos um post para cadastra Usuarios
//* colocamos uma "async / await" para ter certeza que iremos criar os dados
app.post('/users/create', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter == 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  await User.create({
    name,
    occupation,
    newsletter
  })

  res.redirect('/')
});

//* rota para o home
//* findAll => Retorna todo os elementos

app.get('/', async (req, res) => { // para renderizar a home;

  const user = await User.findAll({
    raw: true //! raw => transforma todos os dados em array
  });
  res.render('home', {
    users: user
  });

});


//*nesta função estamos filtrando somente um dado e usamos o metodo "where"
//* where => usamos para filtra dados no sequelize
//* findOne => usamos para retornar somente um result
app.get('/users/:id', async (req, res) => {

  const ide = req.params.id; //! mapiamos o ID do mesmo solicitado

  const user = await User.findOne({
    raw: true,
    where: {
      id: ide
    }
  });

  res.render('userview', {
    user
  })

});

//* esta rota usamos para excluir os dados
//*usamos o destroy=> para excluir os dados dentro do banco de dados
app.post('/users/delete/:id', async (req, res) => {

  const ide = req.params.id; //! fazemos a requisicion
  await User.destroy({
    where: {
      id: ide
    }
  });
  res.redirect('/') //! aqui fazemos um redirect pois nao vamos redirecionar nada

});

//* esta rota puxar os itens para fazermos a edição
//* puxamos atraves do metodo get
app.get('/users/edit/:id', async (req, res) => {
  const ide = req.params.id; //! fazemos a requisicion
  const user = await User.findOne({
    //raw : true, //trocamos o mesmo agora por incluids pois iremos trocar os dados tambem do address
    include: Address, // estamos puxando o endereço tambem pois fica facil pois estao relacionados pelo "USERID"
    where: {
      id: ide
    }
  });

  //como tiramos o raw agora vira um OBJ e precisamos tratar esta informations
  res.render('useredit', {
    //user => agora temos que colocar o tratamento
    user: user.get({
      plain: true //
    })
  }) //! aqui fazemos um redirect pois nao vamos redirecionar nada

});

//* aqui fazemos a atualização dentro do banco de dados
//* com o sequelize temos atulização marcada pelo proprio sequelize dentro do banco
app.post('/users/update', async function (req, res) {
  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id: id,
    name: name,
    occupation: occupation,
    newsletter: newsletter,
  }

  await User.update(userData, {
      where: {
        id: id,
      },
    })
    .then((user) => {
      console.log(user)
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

//*Criamos uma rosta para enviar os dados para o banco de dados;
app.post('/address/create', async (req, res) => {
  const UserId = req.body.UserId //pegamos os dados do url
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city

  const address = {
    street: street,
    number: number,
    city: city,
    UserId: UserId
  }

  await Address.create(address) //iremos criar os dados dentro da tabel adress
    .then(res.redirect('/')) //
    .catch((err) => console.log(err))
})

//* criamos a rota para enviar a alteração ao banco de dados do endereço
app.post('/address/delete/', async (req, res) => {
  const id = req.body.id;
  await Address.destroy({
      where: {
        id: id,
      },
    })
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})




//*conectamos com o banco de dados de forma permanente e criando as tableams dentro o mysql
conn.sync().then(() => { //conectamos com o banco de dados criando as tabelas

  app.listen(3000)

}).catch((err) => {

  console.log(err)
});

// //todo- Reconstrução de tabela
// //*podemos fazer um metodo que reconstruimos todas as tabelas e apagamos todos os dados do banco de dado
// //*conn.sync({force: true}) => isto fara todo o processo
// conn.sync({
//   force: true
// }).then(() => { //conectamos com o banco de dados criando as tabelas

//   app.listen(3000)

// }).catch((err) => {

//   console.log(err)
// });
