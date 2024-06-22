const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./src/db');
const loginRouter = require('./src/routes/loginRouter');
const cadastroRouter = require('./src/routes/cadastroRouter');
const doadorRoutes = require('./src/routes/doadorRoutes');
const dinheiroRouter = require ('./src/routes/dinheiroRouter');
const adminRouter = require('./src/routes/adminRouter');
const MeuperfilRouter = require('./src/routes/MeuperfilRouter');
const listUserRoutes = require('./src/routes/listUserRoutes');


const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(session({
  secret: 'secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));



app.use(express.static('public'));

app.use('/', loginRouter);
app.use('/', cadastroRouter);
app.use('/', doadorRoutes); 
app.use('/', dinheiroRouter);
app.use('/', adminRouter);
app.use('/', MeuperfilRouter);
app.use('/', listUserRoutes);

db.sync()
  .then(() => {
    console.log('Banco de dados conectado');
    const PORT = process.env.PORT || 8080; 
    app.listen(PORT, () => {
      console.log('Aplicativo em execução na porta ' + PORT);
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
