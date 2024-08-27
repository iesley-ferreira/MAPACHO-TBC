import React from 'react';

interface UserMenuProps {
  setSelectedMenu: (menu: string) => void;
  selectedMenu: string; // Adiciona uma prop para o menu selecionado
}
const UserMenu: React.FC<UserMenuProps> = ({ setSelectedMenu, selectedMenu }) => {
  return (
    <nav className="w-full lg:w-72 flex flex-col lg:min-h-full py-8 px-4 border border-r-gray-400/50 overflow-auto sm:rounded-b-md lg:rounded-none lg:rounded-l-md">
      <div className="mb-6">
        <div className="flex flex-col justify-center items-center px-4 pt-4 pb-6">
          <img className="mb-4" src="/assets/avatar.png" alt="imagem de perfil" />
          <h2 className="text-lg font-medium text-coolGray-900">Iesley Ferreira</h2>
          <h3 className="mb-3 text-md font-medium text-coolGray-400">
            iesleyferreira@hotmail.com
          </h3>
        </div>
        <ul>
          <li className="mb-4">
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                selectedMenu === 'UserInfo'
                  ? 'bg-gray-800/20 text-gray-800'
                  : 'text-gray-800 hover:bg-gray-800/20'
              }`}
              onClick={() => setSelectedMenu('UserInfo')}
            >
              <img
                className="flex items-center justify-center w-8 h-8"
                src="/assets/images/user/personal-info-icon.svg"
                alt="Icone de Informações pessoais"
              />
              <span className="ml-4 text-sm font-semibold">Informações pessoais</span>
            </button>
          </li>

          <li className="mb-4">
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                selectedMenu === 'UserAddresses'
                  ? 'bg-gray-800/20 text-gray-800'
                  : 'text-gray-800 hover:bg-gray-800/20'
              }`}
              onClick={() => setSelectedMenu('UserAddresses')}
            >
              <img
                className="w-8 h-8"
                src="/assets/images/user/addresses-icon.svg"
                alt="Icone endereços"
              />
              <span className="ml-4 text-sm  font-semibold">Meus endereços</span>
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                selectedMenu === 'UserOrders'
                  ? 'bg-gray-800/20 text-gray-800'
                  : 'text-gray-800 hover:bg-gray-800/20'
              }`}
              onClick={() => setSelectedMenu('UserOrders')}
            >
              <img
                className="w-8 h-8"
                src="/assets/images/user/orders-icon.svg"
                alt="Icone de pedidos"
              />
              <span className="ml-4 mr-auto text-sm font-semibold">Meus pedidos</span>
              <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-semibold rounded-full">
                2
              </span>
            </button>
          </li>
          <li className="mb-4">
            <button className="flex items-center px-4 py-2 rounded-xl">
              <img
                className="w-8 h-8"
                src="/assets/images/user/logout-icon.svg"
                alt="Icone de logout"
              />
              <span className="ml-4 text-sm text-gray-800 font-semibold">Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserMenu;
