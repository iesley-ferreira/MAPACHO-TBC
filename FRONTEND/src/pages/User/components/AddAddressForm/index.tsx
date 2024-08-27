import React from 'react';

interface AddAddressFormProps {
  onCancel: () => void;
  onSave: () => void;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onCancel, onSave }) => {
  return (
    <section className="w-full">
      <div className="container px-4 mx-auto">
        <div className="py-6 h-full overflow-hidden">
          <div className="py-6 border-b border-coolGray-100">
            <div className="pb-6 border-b border-coolGray-100">
              <div className="flex flex-wrap items-center justify-between -m-2">
                <div className="w-full md:w-auto p-2">
                  <h2 className="text-xl lg:text-2xl font-bold uppercase">
                    Novo Endereço
                  </h2>
                  <p className="text-xs text-coolGray-500 font-medium">
                    Crie um novo endereço
                  </p>
                </div>
              </div>
            </div>
            <div className="py-6 w-full md:w-10/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Endereço</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="flex flex-wrap -m-3">
                    {/* Campo de CEP */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        CEP
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="00000-000"
                      />
                    </div>
                    {/* Campo de Rua */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Rua
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Nome da Rua"
                      />
                    </div>
                    {/* Campo de Número */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Número
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Número"
                      />
                    </div>
                    {/* Campo de Cidade */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Cidade
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Cidade"
                      />
                    </div>
                    {/* Campo de Estado */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Estado
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Estado"
                      />
                    </div>
                    {/* Campo de Bairro */}
                    <div className="w-full md:w-1/2 p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Bairro
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Bairro"
                      />
                    </div>
                    {/* Campo de Complemento */}
                    <div className="w-full p-3">
                      <p className="mb-1.5 font-medium text-base text-coolGray-800">
                        Complemento
                      </p>
                      <input
                        className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        type="text"
                        placeholder="Complemento"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="p-6 bg-coolGray-50 bg-opacity-60 rounded-b-md">
            <div className="w-full md:w-10/12">
              <div className="flex flex-wrap justify-end -m-1.5">
                <div className="w-full md:w-auto p-1.5">
                  <button
                    className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="w-full md:w-auto p-1.5">
                  <button
                    className="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    onClick={onSave}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAddressForm;
