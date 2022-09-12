export interface Name {
  first?: string;
  last?: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  pincode: number;
  landmark?: string;
}

interface IObjectKeys {
  [key: string]: string | any;
}

interface User extends IObjectKeys {
  _id?: string;
  userId?: number;
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: number | string;
  avatar?: string | File;
  gender?: string;
  dob?: Date | string;
  address?: Address;
  salary?: number;
}

export default User;
