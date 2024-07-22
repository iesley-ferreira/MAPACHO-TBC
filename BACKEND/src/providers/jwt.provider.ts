import jwt from 'jsonwebtoken';
import { env } from '../env';
import { UserType } from '../types/User.type';

const sign = (user: UserType) =>
  jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      img_profile: user.img_profile,
      google_id: user.google_id,
      created_at: user.created_at,
      orders: user.orders,
    },
    env.SECRET_KEY_JWT,
    {
      expiresIn: '1d',
    },
  );

const jwtProvider = {
  sign,
};

export default jwtProvider;
