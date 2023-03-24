import { Request, Response } from 'express';

interface ICidade {
  name: string
}

export const create = (req: Request, res: Response) => {
  const { name } = req.body as ICidade;
  console.log(name);



  return res.send('create!');
};
