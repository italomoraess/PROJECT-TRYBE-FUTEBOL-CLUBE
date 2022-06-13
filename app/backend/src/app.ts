import * as express from 'express';

import routerLogin from './routes/routesLogin';
import routerTeams from './routes/routesTeams';
import routerMatches from './routes/routesMatches';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }

  public routes() {
    this.app.use('/login', routerLogin);
    this.app.use('/teams', routerTeams);
    this.app.use('/matches', routerMatches);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
