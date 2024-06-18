import { Application, Request, Response, NextFunction } from 'express';
import { ErrorInterface } from './types/error';

export default ({ app }: { app: Application }) => {
  class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
  }

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: Error = new HttpError('Not Found', 404);
    next(err);
  });

  app.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
    next();
  });
};
