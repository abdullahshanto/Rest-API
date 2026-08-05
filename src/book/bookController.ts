import type { Request, Response, NextFunction } from 'express';

const createbook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({});
  } catch (err) {
    next(err);
  }
};

export { createbook };
