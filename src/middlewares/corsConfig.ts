import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { Request } from 'express';

const whitelist = ['http://localhost:5001'];

const corsOptionsDelegate: CorsOptionsDelegate<Request> = (req, callback) => {
  const origin = req.header('Origin');
  if (origin && whitelist.includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(new Error('Not allowed by CORS'), { origin: false });
  }
};

export const corsMiddleware = cors();
export const corsWithOptions = cors(corsOptionsDelegate);
