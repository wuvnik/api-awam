// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { FC } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// eslint-disable-next-line import/no-extraneous-dependencies
import EnhancedTableToolbar from '../table/EnhancedTableToolbar';
import EnhancedTableHead from '../table/EnhancedTableHead';
import RenderApiFeature from '../table/RenderAPIFeature';
import getComparator from '../../utils/getComparator';
import stableSort from '../../utils/stableSort';

import { IEntry } from '../../interfaces/IEntry';
import { Order } from '../../interfaces/IEnhancedTableProps';
import { IUserItemProps } from '../../interfaces/IUserItemProps';

// for example
// const rows: IEntry[] = listApi.entries;

const ApiListTable: FC<IUserItemProps> = ({ data, query, setQuery }) => {
  const [order, setOrder] = React.useState<Order>('asc');
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
      const newSelecteds = data.map((n) => n.Link);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const fetchedData = stableSort(data, getComparator(order, orderBy))
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const newData = search(fetchedData);

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
              rowCount={data?.length}
            />
            <TableBody>
              {/* if don't need to support IE11, can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {data?.length > 0 &&
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
                        <div>{row.API}</div>
                        <p className="text-tinytext-[#a0a0a6]">
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
                      </TableCell>
                      <TableCell align="left">
                        <RenderApiFeature feature={row.Auth.toString()} />
                      </TableCell>
                      <TableCell align="left">
                        <RenderApiFeature feature={row.Cors.toString()} />
                      </TableCell>
                      <TableCell align="left">
                        <RenderApiFeature feature={row.HTTPS.toString()} />
                      </TableCell>
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
          rowsPerPageOptions={[5, 10, 25, data?.length]}
          component="div"
          count={data?.length}
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

export default ApiListTable;
