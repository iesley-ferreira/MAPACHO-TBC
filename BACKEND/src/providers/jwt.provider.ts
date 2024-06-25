import jwt from 'jsonwebtoken';
import { env } from '../env';

type UserType = {
  id: string;
  name: string;
  email: string;
};

const sign = (user: UserType) =>
  jwt.sign({ id: user.id, name: user.name, email: user.email }, env.SECRET_KEY_JWT, {
    expiresIn: '1d',
  });

const jwtProvider = {
  sign,
};

export default jwtProvider;
