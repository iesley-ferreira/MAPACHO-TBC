import jwtProvider from '../../providers/jwt.provider';
import { IOrder, IProduct } from '../../types/Order.type';
import { ReturnServiceType } from '../../types/ReturnService.type';
import { UserInputType } from '../../types/User.type';
import loginModel from '../models/login.model';
import productsModel from '../models/product.model';
import userModel from '../models/user.model';

const signIn = async (email: string, password: string): Promise<ReturnServiceType> => {
  if (!email || !password) {
    return {
      data: {
        message: 'Email e senha são obrigatórios',
      },
      status: 400,
    };
  }

  const user = await loginModel.signIn.emailAndPassword(email, password);

  if (!user) {
    return {
      data: {
        message: 'Usuário ou senha inválidos',
      },
      status: 400,
    };
  }
  const { password: _, ...userWithoutPassword } = user;

  if (user.isPending) {
    return {
      data: {
        message: 'Usuário não autenticado. Verifique seu email para completar o cadastro',
        user: userWithoutPassword,
      },
      status: 401,
    };
  }

  return {
    data: {
      message: 'Usuário autenticado com sucesso',
      user: userWithoutPassword,
    },
    status: 200,
  };
};

const googleSignIn = async ({
  google_id,
  email,
  name,
  img_profile,
}: UserInputType): Promise<ReturnServiceType> => {
  if (!google_id || !email) {
    return {
      data: {
        message: 'Google ID e email são obrigatórios',
      },
      status: 400,
    };
  }

  const userByEmail = await loginModel.signIn.email(email);

  if (!userByEmail) {
    throw new Error('User not found');
  }

  const ordersByUser = await userModel.getOrdersByUser(userByEmail.id);

  const ordersWithProducts: IOrder[] = await Promise.all(
    ordersByUser.map(async (order): Promise<IOrder> => {
      const products: IProduct[] = await productsModel.getProductByOrderId(order.id);
      return {
        id: order.id,
        total: order.total,
        status: order.status,
        products,
        created_at: order.created_at,
      };
    }),
  );

  console.log('ordersWithProducts', ordersWithProducts);

  const {
    password: _,
    resetPasswordExpires: __,
    resetPasswordToken: ___,
    ...userWithoutPassword
  } = userByEmail!;

  const userWithOrders = {
    ...userWithoutPassword,
    orders: ordersWithProducts,
  };

  const token = jwtProvider.sign(userWithOrders);

  // if (userByEmail && !userByEmail.google_id) {
  //   return {
  //     data: {
  //       message: 'Email já cadastrado. Faça login com sua senha',
  //     },
  //     status: 400,
  //   };
  // }

  if (!userByEmail) {
    const newUser = await loginModel.signUp.credentialsGoogleAccount({
      email,
      name,
      google_id,
      img_profile,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    const newUserWithOrders = {
      ...userWithoutPassword,
      orders: [],
    };

    const token = jwtProvider.sign(newUserWithOrders);

    return {
      data: {
        message: 'Usuário criado com sucesso',
        user: userWithoutPassword,
        token,
      },
      status: 201,
    };
  }

  return {
    data: {
      message: 'Usuário autenticado com sucesso',
      user: userWithoutPassword,
      token,
    },
    status: 200,
  };
};

const loginService = { signIn, googleSignIn };

export default loginService;
