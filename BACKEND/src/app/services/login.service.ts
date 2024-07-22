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

  const ordersByUser = await userModel.getOrdersByUser(user.id);

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

  const userWithOrders = {
    ...userWithoutPassword,
    orders: ordersWithProducts,
  };

  const token = jwtProvider.sign(userWithOrders);

  if (user && user.google_id) {
    return {
      data: {
        message: 'Email já cadastrado com Google. Faça login com sua conta Google',
        user: userWithoutPassword,
      },
      status: 400,
    };
  }

  if (user?.isPending) {
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
      token,
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

  const { password: _, ...userWithoutPassword } = userByEmail!;

  const userWithOrders = {
    ...userWithoutPassword,
    orders: ordersWithProducts,
  };

  const token = jwtProvider.sign(userWithOrders);

  if (
    userByEmail &&
    (!userByEmail.google_id || userByEmail.img_profile !== img_profile)
  ) {
    await loginModel.signIn.updateGoogleIdAndImgProfile(
      userByEmail.email,
      google_id,
      img_profile!,
    );
    if (userByEmail.isPending) {
      await userModel.updateUserStatus(userByEmail.id, false);
    }

    const updatedUser = await userModel.findUserByEmail(email);

    const { password: __, ...userWithoutPassword } = updatedUser!;

    const updatedUserWithOrders = {
      ...userWithoutPassword,
      orders: ordersWithProducts,
    };

    const updatedToken = jwtProvider.sign(updatedUserWithOrders);

    return {
      data: {
        message: 'Usuário autenticado com sucesso',
        user: updatedUserWithOrders,
        token: updatedToken,
      },
      status: 200,
    };
  }

  return {
    data: {
      message: 'Usuário autenticado com sucesso',
      user: userWithOrders,
      token,
    },
    status: 200,
  };
};

const loginService = { signIn, googleSignIn };

export default loginService;
