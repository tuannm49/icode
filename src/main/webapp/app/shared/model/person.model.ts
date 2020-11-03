export interface IPerson {
  id?: number;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
}

export class Person implements IPerson {
  constructor(public id?: number, public fullName?: string, public address?: string, public phoneNumber?: string, public email?: string) {}
}
