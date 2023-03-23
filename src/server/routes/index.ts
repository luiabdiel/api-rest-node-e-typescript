import { Router } from 'express' ;
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  res.send('Hello world');
});

router.post('/teste', (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router };
