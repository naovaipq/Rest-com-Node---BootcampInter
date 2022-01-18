import express from 'express';
import errorHendler from './middlewares/error-hendler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurações de Rotas
app.use(usersRoute);
app.use(statusRoute);


// Configuração dos Handlers de Erro
app.use(errorHendler) 

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000 - localhost:3000/users');
});





