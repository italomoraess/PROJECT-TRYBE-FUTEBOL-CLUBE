import * as bcrypt from 'bcryptjs';
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

export default login;
