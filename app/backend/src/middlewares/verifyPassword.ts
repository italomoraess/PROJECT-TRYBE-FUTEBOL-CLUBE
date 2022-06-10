import { Request, Response, NextFunction } from 'express';

const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be long than 6 characters ' });
  }

  next();
};

export default verifyPassword;
