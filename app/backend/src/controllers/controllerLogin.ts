import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import serviceLogin from '../services/serviceLogin';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const user = await serviceLogin(email, password);
  if (user === undefined) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  console.log(secret);
  const token = jwt.sign(
    { user },
    secret,
    { expiresIn: '7d', algorithm: 'HS256' },
  );
  return res.status(200).json({ user, token });
};

export default login;
