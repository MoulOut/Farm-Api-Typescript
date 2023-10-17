import { server } from './Server/Server';

const startServer = () => {
  server.listen(process.env.PORT || 3333, () =>{
    console.log(`App rodando na porta ${process.env.PORT}`);
    
  });
};

startServer();
