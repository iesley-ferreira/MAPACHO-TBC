import React from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces/User';
import { RootState } from '../../store/ducks/rootReducer';

const User: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userFromStore = user as unknown as IUser | null;

  return (
    <div className="flex items-start pt-36 justify-center w-full h-screen py-8">
      <div>
        <div className="flex items-center justify-center w-full py-8">
          <i
            className="ri-user-3-fill mr-2 text-2xl"
            style={{ color: 'var(--text-title)' }}
          ></i>
          <h1>IESLEY FERREIRA</h1>
        </div>

        <div className="flex items-center justify-center w-full py-6">
          {userFromStore?.pedidos ? (
            <ul>
              {userFromStore.pedidos.map((pedido, index) => (
                <li key={index}>{String(pedido)}</li>
              ))}
            </ul>
          ) : (
            <p>Você não possui nenhum pedido</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
