import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string;
  estate: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  name: yup.string().required().min(3),
  estate: yup.string().required().min(2),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false});
    next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return; 

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors }); 
  }
};

export const create: RequestHandler = async (req, res) => {
  const {name, estate} = req.body as ICidade;

  console.log(name, estate);
  
  return res.send('create!');
};
