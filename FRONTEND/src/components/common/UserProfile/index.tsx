import React, { useState } from 'react';
import { IUser } from '../../../interfaces/User';
import { dateFormatter } from '../../../utils/dateFormatter';
import UserConfig from '../../UI/UserConfig';

type UserProfileProps = {
  user: IUser;
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isModalEditProfileFormOpen, setIsModalEditProfileFormOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalEditProfileFormOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalEditProfileFormOpen(false);
  };

  return (
    <section className="pt-16 md:pt-20 pb-12 bg-blueGray-950">
      <div className="container px-4 mx-auto">
        <div className="relative px-4 max-w-sm mx-auto pt-16 pb-12 text-center border border-gray-900 border-opacity-30 rounded-lg">
          <img
            className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            src={user.img_profile}
            alt="imagem de usuário"
          />
          <div className="flex flex-row relative">
            <h2 className="mb-4 text-4xl tracking-4xl md:max-w-sm mx-auto">
              {user.name}
            </h2>
            <div className="group absolute right-0">
              <button
                className=" hover:bg-gray-300 text-grey font-bold py-2 px-4 rounded-md"
                onClick={handleEditClick}
              >
                <i className="ri-settings-5-fill hover:scale-[1.3] transition-opacity duration-300"></i>
              </button>
              <span className="absolute right-0 top-12 w-32 bg-gray-800 text-white text-center text-sm py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Configurações
              </span>
            </div>
          </div>
          <p className="mb-6 text-gray-600 md:max-w-xs mx-auto">
            {dateFormatter(user.created_at || '')}
          </p>
          <ul className="relative">
            {user.cell_phone && (
              <li className="flex flex-wrap items-center justify-center mb-4">
                <i className="ri-phone-line mr-2 md:text-2xl"></i>
                <p>{user.cell_phone}</p>
              </li>
            )}
            <li className="flex flex-wrap items-center justify-center">
              <i className="ri-mail-line mr-2 md:text-2xl"></i>
              <p className="text-center align-text-bottom">{user.email}</p>
            </li>
          </ul>
        </div>
      </div>
      {isModalEditProfileFormOpen && (
        <UserConfig user={user} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default UserProfile;
