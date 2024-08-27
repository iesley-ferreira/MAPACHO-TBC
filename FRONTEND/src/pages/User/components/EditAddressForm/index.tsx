import React, { useState } from 'react';
import { IUserAddress } from '../../../../interfaces/User';

interface EditAddressFormProps {
  address: IUserAddress;
  onCancel: () => void;
  onSave: () => void;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({
  address,
  onCancel,
  onSave,
}) => {
  const [editedAddress, setEditedAddress] = useState<IUserAddress>(address);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h5 className="font-bold text-xl mb-4">Editar Endereço</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="street">
            Endereço:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="street"
            type="text"
            name="street"
            value={editedAddress.street}
            onChange={handleChange}
          />
        </div>
        {/* Outros campos do formulário de endereço */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Salvar
          </button>
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddressForm;
