import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IUserAddress } from '../../interfaces/User';
import { RootState } from '../../store/ducks/rootReducer';
import AddAddressForm from './components/AddAddressForm';
import EditAddressForm from './components/EditAddressForm';
import UserAddresses from './components/UserAddresses';
import UserInfo from './components/UserInfo';
import UserMenu from './components/UserMenu';
import UserOrders from './components/UserOrders';

const User: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedMenu, setSelectedMenu] = useState<string>('UserInfo');
  const [editingAddress, setEditingAddress] = useState<IUserAddress | null>(null);
  const [addingAddress, setAddingAddress] = useState<boolean>(false);

  const renderComponent = () => {
    switch (selectedMenu) {
      case 'UserInfo':
        return <UserInfo />;
      case 'UserAddresses':
        if (addingAddress) {
          return (
            <AddAddressForm
              onCancel={() => setAddingAddress(false)}
              onSave={() => setAddingAddress(false)}
            />
          );
        }
        return (
          <UserAddresses
            addresses={[
              {
                id: 1,
                zip_code: '96206270',
                street: 'Rua Jair Luiz Caumo',
                city: 'Rio Grande',
                number: '123',
                state: 'RS',
                neighborhood: 'Centro',
                complement: 'Casa',
              },
              {
                id: 2,
                zip_code: '32106270',
                street: 'Rua Fernando Antonio',
                city: 'Rio Grande',
                number: '73',
                state: 'RS',
                neighborhood: 'Centro',
                complement: 'apto 23',
              },
            ]}
            onEdit={(address) => {
              setEditingAddress(address);
              setSelectedMenu('EditAddress');
            }}
            onAdd={() => setAddingAddress(true)} // Define o estado para adicionar novo endereço
          />
        );
      case 'EditAddress':
        return editingAddress ? ( // Verifica se editingAddress não é null
          <EditAddressForm
            address={editingAddress}
            onCancel={() => setSelectedMenu('UserAddresses')}
            onSave={() => setSelectedMenu('UserAddresses')}
          />
        ) : null;
      case 'UserOrders':
        return (
          <UserOrders
            orders={[
              {
                id: 47413412,
                status: 'PROCESSANDO',
                total: 134,
                created_at: '01/07/2024',
                products: [],
              },
              {
                id: 57433444,
                status: 'APROVADO',
                total: 72,
                created_at: '02/12/2024',
                products: [],
              },
            ]}
          />
        );
      default:
        return <UserInfo />;
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full px-4 lg:px-0 pt-6 justify-center mt-16 py-8">
      <div>
        <h2 className="text-xl py-4 lg:text-3xl font-semibold">Minha Conta</h2>
      </div>
      <div className="flex flex-col w-full lg:w-2/3 md:flex-row rounded-lg border border-gray-400/50">
        <UserMenu setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        <div className="flex flex-col lg:w-5/6 items-center justify-center p-4 lg:p-12 lg:min-w-96">
          <div className="flex-grow flex justify-center w-full">{renderComponent()}</div>
        </div>

        {/* <div>
        <UserProfile user={user} />
        <UserOrders orders={user.orders!} />
        </div> */}
      </div>
      <div className="lg:w-2/3 px-3 lg:px-0 py-10">
        <h2 className="text-lg py-4 lg:text-xl font-semibold">Historia da Mapacho</h2>
        <p className="text-coolGray-500 font-medium mb-4">
          Localizada na majestosa praia do Cassino, em Rio Grande, RS — a maior praia em
          extensão do mundo — a Mapacho é uma loja que reflete a vibração única e a
          cultura da região. Desde sua fundação em 2015, a Mapacho tem se dedicado a
          atender a comunidade local e turistas com uma ampla variedade de produtos de
          headshop, sempre priorizando qualidade, autenticidade e um atendimento
          atencioso.
        </p>
        <p className="text-coolGray-500 font-medium mb-4">
          A Mapacho nasceu do desejo de oferecer aos seus clientes uma experiência
          completa no mundo dos headshops. Criamos um espaço onde todos são bem-vindos
          para explorar uma vasta gama de produtos — desde acessórios, itens de tabacaria
          até artigos de decoração e lifestyle. Acreditamos que cada produto carrega
          consigo um estilo de vida, e nossa missão é oferecer opções para todos os gostos
          e preferências.
        </p>
        <p className="text-coolGray-500 font-medium mb-4">
          Aqui, cada cliente é tratado como um amigo e cada visita é uma oportunidade para
          compartilhar histórias, aprender algo novo e descobrir produtos que complementam
          seu estilo de vida. Nossa equipe é composta por especialistas apaixonados pelo
          que fazem e sempre prontos para oferecer um atendimento personalizado e
          orientado, ajudando você a encontrar exatamente o que precisa.
        </p>
        <p className="text-coolGray-500 font-medium mb-4">
          Seja você um conhecedor experiente ou alguém explorando o universo headshop pela
          primeira vez, a Mapacho é o lugar certo para você. Visite-nos e experimente a
          atmosfera acolhedora e única que só a Mapacho pode oferecer. Descubra por que
          somos mais do que uma loja — somos uma comunidade vibrante, onde a liberdade de
          escolha e a expressão pessoal são sempre bem-vindas.
        </p>
      </div>
    </div>
  );
};

export default User;
