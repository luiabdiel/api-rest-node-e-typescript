import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const create = async (req: Request, res: Response) => {
  const { name } = req.body as ICidade;

  let validatedData: ICidade | undefined = undefined;


  try {
    validatedData = await bodyValidation.validate({ name });
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      }
    }); 
  }
  
  console.log(validatedData);
  
  return res.send('create!');
};
