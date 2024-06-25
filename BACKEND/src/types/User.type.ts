export type UserType = {
  id: string;
  name: string;
  email: string;
  cep?: string;
  address?: string;
  city?: string;
  country?: string;
  password: string;
  img_profile?: string;
  google_id?: string | undefined;
  created_at: Date;
  updated_at: Date;
  isPending?: boolean;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserInputType = Omit<
  UserType,
  | 'id'
  | 'cep'
  | 'address'
  | 'city'
  | 'country'
  | 'isPending'
  | 'created_at'
  | 'updated_at'
>;
