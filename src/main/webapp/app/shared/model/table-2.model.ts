export interface ITable2 {
  id?: number;
  name?: string;
}

export class Table2 implements ITable2 {
  constructor(public id?: number, public name?: string) {}
}
