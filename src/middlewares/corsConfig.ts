import { Request, Response, NextFunction } from 'express';

const whitelist = ['http://localhost:5001'];

export const corsWithOptions = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.header('Origin');
  if (origin && whitelist.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  } else {
    res.status(403).send('Not allowed by CORS');
  }
};

