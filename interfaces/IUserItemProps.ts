import { IEntry } from './IEntry';

export interface IUserItemProps {
  data: IEntry[];
  query: string;
  // setQuery: React.ChangeEventHandler<HTMLInputElement>;
  setQuery: any;
}
