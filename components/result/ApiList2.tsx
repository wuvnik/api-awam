// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
// eslint-disable-next-line import/no-extraneous-dependencies

import { visuallyHidden } from '@mui/utils';

import { FC } from 'react';
import listApi from '../../constants/listApi';
import { IEntry } from '../../interfaces/IApi';

const rows: IEntry[] = listApi.entries;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  //   id: keyof Data;
  id: keyof IEntry;

  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IEntry
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

// eslint-disable-next-line react/function-component-definition
function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof IEntry) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        <TableCell padding="none">
          {/* <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {/* <TableCell>Auth</TableCell>
        <TableCell>CORS</TableCell>
        <TableCell>HTTPS</TableCell> */}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  // setQuery: React.SetStateAction<string>;
  // setQuery: React.ChangeEventHandler<HTMLInputElement>;
  setQuery: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, setQuery } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected < 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        // <Typography
        //   sx={{ flex: '1 1 100%' }}
        //   variant="h6"
        //   id="tableTitle"
        //   component="div"
        // >
        //   API
        // </Typography>
        <div className="flex flex-col gap-1 px-5 pt-4 w-[900px]z w-full bg-blackz">
          <h1>API</h1>
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="Filter"
            className="flex px-2 py-1 outline-none border rounded-md w-full md:w-1/2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

interface UserItemProps {
  data: IEntry[];
  query: string;
  // setQuery: React.ChangeEventHandler<HTMLInputElement>;
  setQuery: any;
}

const ApiList2: FC<UserItemProps> = ({ data, query, setQuery }) => {
  const rows2 = data;
  const [order, setOrder] = React.useState<Order>('asc');
  //   const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [orderBy, setOrderBy] = React.useState<keyof IEntry>('API');

  const [selected, setSelected] = React.useState<readonly string[] | any[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const keys = ['Description', 'API'];
  // eslint-disable-next-line no-shadow
  const search = (data: any[]) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    // property: keyof Data
    property: keyof IEntry
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.Link);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string | any) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows2.length) : 0;

  const fetchedData = stableSort(rows2, getComparator(order, orderBy))
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const newData = search(fetchedData);
  // console.log('FF', newData);

  const renderApiFeature = (feature: string) => {
    switch (feature) {
      case 'true':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
            Yes
          </div>
        );
      case 'false':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 text-white bg-[#e14545] rounded-lg">
            No
          </div>
        );
      case 'yes':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
            Yes
          </div>
        );
      case 'no':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 text-white bg-[#e14545] rounded-lg">
            No
          </div>
        );
      case 'apiKey':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 text-white bg-[#4845e1] rounded-lg">
            {feature}
          </div>
        );
      case 'OAuth':
        return (
          <div className="flex text-centeritems-center justify-center w-fit px-2 text-white bg-[#e145d7] rounded-lg">
            {feature}
          </div>
        );
      case '':
        return <div className="flex justify-centerbg-slate-400">-</div>;
      default:
        return feature;
    }
    // if (feature === 'true') {
    //   return (
    //     <div className="flex text-centeritems-center justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
    //       Yes
    //     </div>
    //   );
    // }
    // return feature;
  };
  // if(!data) return

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setQuery={setQuery}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {rows2.length > 0 &&
                // stableSort(rows2, getComparator(order, orderBy))
                //   // rows
                //   .sort(getComparator(order, orderBy))
                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                newData.map((row, index) => {
                  const isItemSelected = isSelected(row.Link);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.Link)}
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Link}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell> */}
                      <TableCell padding="normal">
                        {/* <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {/* {row.API}
                        {row.Description} */}
                        <div>{row.API}</div>
                        <p className="text-tiny text-neutral/400zz text-gray-400z text-[#a0a0a6]">
                          {row.Description}
                        </p>
                      </TableCell>
                      <TableCell align="left">{row.Category}</TableCell>
                      <TableCell align="left">
                        <a
                          href={row.Link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          {row.Link}
                        </a>
                        {/* {row.Link} */}
                      </TableCell>
                      {/* <TableCell align="left">{row.Auth.toString()}</TableCell>
                      <TableCell align="left">{row.Cors.toString()}</TableCell> */}
                      <TableCell align="left">
                        {renderApiFeature(row.Auth.toString())}
                      </TableCell>
                      <TableCell align="left">
                        {renderApiFeature(row.Cors.toString())}
                      </TableCell>
                      <TableCell align="left">
                        {renderApiFeature(row.HTTPS.toString())}
                      </TableCell>
                      {/* <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {newData.length === 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * 5,
                  }}
                >
                  <TableCell align="left"> </TableCell>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, rows2.length]}
          component="div"
          //   count={rows.length}
          count={rows2.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};

export default ApiList2;
