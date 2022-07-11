export interface IEntry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface IApi {
  count: number;
  entries: IEntry[];
}
