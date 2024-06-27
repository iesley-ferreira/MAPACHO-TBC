import React from 'react';
import { useSelector } from 'react-redux';
import UserOrders from '../../components/UI/UserOrders';
import UserProfile from '../../components/common/UserProfile';
import { RootState } from '../../store/ducks/rootReducer';
import userMock from './mockUser.json';

const User: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  console.log('USER', user);

  return (
    <div className="flex flex-col pt-6 justify-center mt-16 w-full py-8">
      <div>
        <UserProfile user={user} />
      </div>
      <div>
        {/* <UserOrders orders={user.orders ?? []} /> */}
        <UserOrders orders={userMock.user.orders} />
      </div>
    </div>
  );
};

export default User;
