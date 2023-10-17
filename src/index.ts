import { server } from './Server/Server';

const startServer = () => {
  server.listen(3333, () => console.log('App rodando na porta 3333'));
};

startServer();
