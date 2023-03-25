import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string
  estate: string
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  name: yup.string().required().min(3),
  estate: yup.string().required().min(2),
});

export const create = async (req: Request, res: Response) => {
  const { name } = req.body as ICidade;

  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate({ name }, { abortEarly: false});
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return; 

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors }); 
  }
  
  console.log(validatedData);
  
  return res.send('create!');
};
