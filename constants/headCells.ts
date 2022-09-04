import { IHeadCell } from '../interfaces/IHeadCell';

const headCells: readonly IHeadCell[] = [
  {
    id: 'API',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'Category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'Link',
    numeric: false,
    disablePadding: false,
    label: 'Link',
  },
  {
    id: 'Auth',
    numeric: false,
    disablePadding: false,
    label: 'Auth',
  },
  {
    id: 'Cors',
    numeric: false,
    disablePadding: false,
    label: 'CORS',
  },
  {
    id: 'HTTPS',
    numeric: false,
    disablePadding: false,
    label: 'HTTPS',
  },
];

export default headCells;
