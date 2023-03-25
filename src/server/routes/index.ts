import { Router } from 'express' ;

import { CidadesController } from './../controllers/cidades';

const router = Router();

router.get('/', (_, res) => {
  res.send('Hello world');
});

router.post('/cidades', CidadesController.createBodyValidator, CidadesController.create);

export { router };
