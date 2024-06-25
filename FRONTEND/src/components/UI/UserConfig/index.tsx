import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { IUser } from '../../../interfaces/User';

type UserConfigProps = {
  user: IUser;
  onClose: () => void;
};

const UserConfig: React.FC<UserConfigProps> = ({ user, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    address: false,
    password: false,
    img: false,
  });

  const { zip_code, street, number, city, state, neighborhood, complement } =
    user.address || {};

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    img: user.img_profile,
    address: {
      zip_code,
      street,
      number,
      city,
      state,
      neighborhood,
      complement,
    },
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Image uploaded:', reader.result);
        setSelectedImage(reader.result as string);
        setIsEditing((prev) => ({ ...prev, img: true }));
        // Aqui você pode salvar o resultado (URL ou base64) no banco de dados
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (field: string) => {
    setIsEditing({
      img: field === 'img',
      name: field === 'name',
      email: field === 'email',
      address: field === 'address',
      password: field === 'password',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (field: string) => {
    // Dispatch to update the database
    console.log('Saving data for:', field, formData);
    if (field === 'img') {
      // Lógica para salvar a imagem
      console.log('Saving image:', selectedImage);
    }
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  console.log('formData:', formData);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
        <h2 className="text-center text-2xl mb-4">Editar Perfil</h2>
        <img
          src={selectedImage || '/public/assets/avatar1.png'}
          alt="User Avatar"
          className="w-24 h-24 object-cover rounded-full mx-auto"
        />
        <div className="mb-4 relative border-b border-b-slate-400 pb-4">
          <label className="block mb-2">Carregar imagem</label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="upload-image"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image" className="cursor-pointer"></label>
          <i
            className="ri-folder-image-line absolute right-0 top-0 cursor-pointer text-xl"
            onClick={() => document.getElementById('upload-image')?.click()}
          ></i>
          {isEditing.img && (
            <div className="flex justify-end mt-2">
              <button
                className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => handleSave('img')}
              >
                Salvar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleCancel('img')}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
        <div className="mb-4 relative border-b border-b-slate-400 pb-4">
          <label className="block mb-2 font-semibold">Nome</label>
          {isEditing.name ? (
            <>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  label="Nome"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-error': { borderColor: 'red' },
                    },
                  }}
                />
              </Grid>
              <div className="flex justify-end mt-2">
                <button
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleSave('name')}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleCancel('name')}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p>{formData.name}</p>
              <i
                className="ri-pencil-line cursor-pointer text-xl"
                onClick={() => handleEditClick('name')}
              ></i>
            </div>
          )}
        </div>
        <div className="mb-4 relative border-b border-b-slate-400 pb-4">
          <label className="block mb-2 font-semibold">Email</label>
          {isEditing.email ? (
            <>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-error': { borderColor: 'red' },
                    },
                  }}
                />
              </Grid>
              <div className="flex justify-end mt-2">
                <button
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleSave('email')}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleCancel('email')}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p>{formData.email}</p>
              <i
                className="ri-pencil-line cursor-pointer text-xl"
                onClick={() => handleEditClick('email')}
              ></i>
            </div>
          )}
        </div>
        <div className="mb-4 relative border-b pb-4 border-b-slate-400">
          <label className="block mb-2 font-semibold">Endereço</label>
          {isEditing.address ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="zipCode"
                    label="Cep"
                    fullWidth
                    value={formData.address.zip_code}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="street"
                    label="Rua"
                    fullWidth
                    value={formData.address.street || ''}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="number"
                    label="Número"
                    fullWidth
                    value={formData.address.number || ''}
                    onChange={handleInputChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="city"
                    label="Cidade"
                    fullWidth
                    value={formData.address.city || ''}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="state"
                    label="Estado"
                    fullWidth
                    value={formData.address.state || ''}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="complement"
                    label="Complemento"
                    fullWidth
                    value={formData.address.complement || ''}
                    onChange={handleInputChange}
                    size="small"
                  />
                </Grid>
              </Grid>
              <div className="flex justify-end mt-2">
                <button
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleSave('address')}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleCancel('address')}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              {formData.address?.zip_code ? (
                <div className="flex flex-col">
                  <p>
                    {formData.address.zip_code?.slice(0, 5)}-
                    {formData.address.zip_code?.slice(5)}
                  </p>
                  <p>
                    {formData.address.street}, {formData.address.number}
                  </p>
                  <p>
                    {formData.address.city}, {formData.address.state}
                  </p>
                  {formData.address.complement && <p>{formData.address.complement}</p>}
                </div>
              ) : (
                <p>'Endereço não fornecido'</p>
              )}
              <i
                className="ri-pencil-line cursor-pointer text-xl"
                onClick={() => handleEditClick('address')}
              ></i>
            </div>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 font-semibold">Senha</label>
          {isEditing.password ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="oldPassword"
                    label="Senha antiga"
                    fullWidth
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="newPassword"
                    label="Nova senha"
                    fullWidth
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="confirmPassword"
                    label="Confirme a nova senha"
                    fullWidth
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-error': { borderColor: 'red' },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <div className="flex justify-end mt-2">
                <button
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleSave('password')}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleCancel('password')}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p>••••••••</p>
              <i
                className="ri-pencil-line cursor-pointer text-xl"
                onClick={() => handleEditClick('password')}
              ></i>
            </div>
          )}
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default UserConfig;
