import { Add } from '@mui/icons-material';
import React from 'react';
import { IUserAddress } from '../../../../interfaces/User';

interface UserAddressesProps {
  addresses: IUserAddress[];
  onEdit: (address: IUserAddress) => void;
  onAdd: () => void; // Função para adicionar um novo endereço
}

const UserAddresses: React.FC<UserAddressesProps> = ({ addresses, onEdit, onAdd }) => {
  return (
    <section className="w-full">
      <div className="container px-4 mx-auto">
        <div className="pt-6 h-full overflow-hidden">
          <div className="pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-xl lg:text-2xl font-bold uppercase">
                  Informações Pessoais
                </h2>
                <p className="text-xs text-coolGray-500 font-medium">
                  Atualize suas informações pessoais abaixo
                </p>
              </div>
            </div>
          </div>
          {addresses.map((address, index) => (
            <>
              <div key={index} className="py-2 px-6 lg:w-1/2 rounded-md">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full px-4">
                    <div className="lg:max-w-lg">
                      <div className="flex my-2 pb-4 items-center justify-between border-b border-blueGray-800">
                        <h5 className="font-bold text-xl">Endereço de Entrega</h5>
                      </div>
                      <span className="block font-bold text-gray-700 mb-2">
                        {address.street}, {address.number}
                      </span>
                      <span className="block font-bold text-gray-500">
                        {address.neighborhood}
                      </span>
                      <span className="block font-bold text-gray-500">
                        {address.city}, {address.state} {address.zip_code}
                      </span>
                      <span className="block font-bold text-gray-500">
                        {address.complement}
                      </span>
                    </div>
                    <div className="flex mt-6">
                      <button
                        className="flex items-center py-2 mr-6 text-gray-600 hover:text-gray-800"
                        onClick={() => onEdit(address)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.769 7.3l-2.44-2.44-2.22 2.22 2.44 2.44 2.22-2.22zm-4.24-4.24l2.44 2.44-11.29 11.29h-2.44v-2.44l11.29-11.29zm-2.529 11.959l2.44-2.44-1.5-1.5-2.44 2.44v1.5h1.5zm6.969 2.41h-2v1h-12v-1h-2v1.889c0 .612.498 1.111 1.111 1.111h13.778c.613 0 1.111-.499 1.111-1.111v-1.889z" />
                        </svg>
                        Atualizar
                      </button>
                      <button className="flex items-center py-2 text-gray-600 hover:text-gray-900">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 6h18v2h-18zm2 3h14l-1 12h-12l-1-12zm5-9h4v2h-4v-2zm-1 2h6l1 2h-8l1-2zm3 19c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm-6-18h12v1h-12z" />
                        </svg>
                        Apagar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-coolGray-100"></div>
            </>
          ))}
          {/* Botão para adicionar um novo endereço */}
          <div className="flex items-center justify-center w-full mt-6">
            <button
              className="flex items-center px-4 py-2 border border-gray-300 hover:border-gray-800 rounded-md"
              onClick={onAdd} // Chama a função para adicionar novo endereço
            >
              <Add className="mr-2" sx={{ color: 'black', fontSize: '20px' }} />
              Adicionar Novo Endereço
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAddresses;
