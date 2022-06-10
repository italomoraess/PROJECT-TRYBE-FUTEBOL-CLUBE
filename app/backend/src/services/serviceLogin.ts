import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/User';

const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user) return undefined;

  const keyPassword = await bcrypt.compare(password, user.password);

  if (!keyPassword) return undefined;

  return {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };
};

const loginValidate = async (authorization: string) => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const { user } = jwt.verify(authorization, secret) as JwtPayload;
  return user.role;
};

export default { login, loginValidate };
