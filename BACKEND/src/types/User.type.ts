export type UserType = {
  id: string;
  fullName: string;
  email: string;
  cep?: string;
  address?: string;
  city?: string;
  country?: string;
  password: string;
  codeAccount?: string;
}

export type UserInputType = Omit<UserType, 'id' | 'cep' | 'address' | 'city' | 'country' >
