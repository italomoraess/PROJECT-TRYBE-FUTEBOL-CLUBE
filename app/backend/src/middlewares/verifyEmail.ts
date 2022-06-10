import { Request, Response, NextFunction } from 'express';

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

export default verifyEmail;
