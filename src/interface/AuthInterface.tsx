import { Gender } from "./GenderEnum";
export interface IRole {
  id: number;
  name: string;
}
export interface user {
  id: string | number;
  fullname: string;
  email: string;
  phoneNumber: number;
  address: string;
  gender: Gender;
  birthDate: Date; // Adjust the type according to your date format
}
export interface profile {
  fullname: string;
  email: string;
  phoneNumber: number;
  address: string;
  gender: Gender;
  birthDate: Date; // Adjust the type according to your date format
}

export interface profileCRUD {
  username: string;
  password: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  address: string;
  gender: Gender;
  birthDate: string; // Adjust the type according to your date format
  roles: IRole[];
}
