import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../app/interfaces/error-response.interface';
import { IGenericErrorMessage } from '../app/interfaces/error-message.interface';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = err.issues.map(i => ({
    path: i.path[i.path.length - 1],
    message: i.message,
  }));

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
