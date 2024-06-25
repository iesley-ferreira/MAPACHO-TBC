import React, { useState } from 'react';
import { IUser } from '../../../interfaces/User';
import { dateFormatter } from '../../../utils/dateFormatter';
import UserConfig from '../../UI/UserConfig';
import UserProfileImage from './UserProfileImage';

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
          <UserProfileImage userImage={user.img_profile ?? ''} />
          <div className="group absolute top-1 right-1">
            <button className="py-2 px-3 rounded-md" onClick={handleEditClick}>
              <i className="ri-settings-5-fill text-gray-500 text-2xl transform transition-transform duration-300 group-hover:text-gray-800"></i>
            </button>
            <span className="absolute right-0 top-10 w-32 bg-gray-800 text-white text-center text-sm py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Configurações
            </span>
          </div>
          <div className="flex flex-row relative">
            <h2 className="mb-4 text-4xl tracking-4xl md:max-w-sm mx-auto">
              {user.name}
            </h2>
          </div>
          {user.created_at && (
            <p className="mb-6 text-gray-600 md:max-w-xs mx-auto">
              {dateFormatter(user.created_at)}
            </p>
          )}
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
