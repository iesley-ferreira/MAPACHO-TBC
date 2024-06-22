import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/ducks/rootReducer';
import UserProfile from '../../components/common/UserProfile';
import UserOrders from '../../components/UI/UserOrders';
import { pedidos } from './mockPedidos.json';

const User: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col pt-6 justify-center mt-16 w-full py-8">
      <div>
        <UserProfile name={user.nome} email={user.email} img={user.img} />
      </div>
      <div>
        <UserOrders orders={pedidos} />
      </div>
    </div>
  );
};

export default User;
