export interface ITable1 {
  id?: number;
  name?: string;
}

export class Table1 implements ITable1 {
  constructor(public id?: number, public name?: string) {}
}
