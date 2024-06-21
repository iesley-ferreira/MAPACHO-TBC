import jwt from 'jsonwebtoken';
import { env } from '../env';

type UserType = {
  id: string;
  email: string;
};

const sign = (user: UserType) =>
  jwt.sign({ id: user.id, email: user.email }, env.SECRET_KEY_JWT, {
    expiresIn: '1d',
  });

const jwtProvider = {
  sign,
};

export default jwtProvider;
