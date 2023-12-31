import { server } from './Server/Server';
import { Knex } from './Server/database/knex';

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Rodando migrations');
  Knex.migrate
    .latest()
    .then(() => startServer())
    .catch(console.log);
} else {
  startServer();
}
