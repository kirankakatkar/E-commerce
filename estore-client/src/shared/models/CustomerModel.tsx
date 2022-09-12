import { Name } from "../../shared/models/UserModel";

interface CardDetails {
  cardNumber: number;
  cardHolder: string;
  cardType: string;
  cvv: number;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  pincode: number;
}

interface IObjectKeys {
  [key: string]: string | any;
}

interface Customer extends IObjectKeys {
  custId?: number,
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  avatar?: string | File;
  status?: number | string;
  gender?: string;
  address?: Address;
  cardDetails?: CardDetails;
}

export default Customer;
