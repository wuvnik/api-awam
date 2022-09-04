import { IEntry } from './IEntry';

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IEntry;
  // id: string;
  label: string;
  numeric: boolean;
}
