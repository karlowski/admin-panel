export interface IStat {
  id?: string;
  name: string;
  value?: string;
  active?: boolean;
}

export interface IStatList{
  list: IStat[];
  name: string;
}
