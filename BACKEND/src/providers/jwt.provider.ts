import jwt from 'jsonwebtoken';
import { env } from '../env';

const sing = (payload: object) => jwt.sign(payload, env.SECRET_KEY_JWT, {
  expiresIn: '1d'
});

const jwtProvider = {
  sing,
}


export default jwtProvider;
