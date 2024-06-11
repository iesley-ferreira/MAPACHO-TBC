import jwt from 'jsonwebtoken';
import { env } from '../env';

const sing = (payload: object) => jwt.sign(payload, env.SECRET_KEY, {
  expiresIn: '1d'
});

const jwtProvider = {
  sing,
}


export default jwtProvider;
