export interface IRole {
  id: number;
  name: string;
}
export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  roles: IRole[];
}

export interface IArea extends IRole {}

export interface IRoom extends IRole {
  area: IArea;
  status: boolean;
}

export interface IUnit extends IRole {}

export interface ICategory extends IRole {}

export interface IProduct extends IRole {
  image: string;
  price: number;
  hourly: boolean;
  active: boolean;
  category: ICategory;
  unit: IUnit;
}

export interface IOrderDetail {
  id: number;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  // endTime: string;
}

export interface IOrder {
  id: number;
  isCanceled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  // user: IUser;
  room: IRoom;
  orderDetails: IOrderDetail[];
}