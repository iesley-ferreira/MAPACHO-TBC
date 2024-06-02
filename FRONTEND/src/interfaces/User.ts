export interface IUser {
  id: string
  name: string
  email: string
}

export interface IUserCreateParams {
  name: string
  email: string
  password: string
}
