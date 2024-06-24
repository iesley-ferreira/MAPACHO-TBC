import React from 'react';
import UserOrders from '../../components/UI/UserOrders';
import UserProfile from '../../components/common/UserProfile';
import { user } from './mockUser.json';

const User: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col pt-6 justify-center mt-16 w-full py-8">
      <div>
        <UserProfile user={user} />
      </div>
      <div>
        <UserOrders orders={user.pedidos} />
        {/* <UserOrders orders={user.pedidos} /> */}
      </div>
    </div>
  );
};

export default User;
