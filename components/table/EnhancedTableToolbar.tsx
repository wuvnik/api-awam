import { alpha } from '@mui/material/styles';
import { Toolbar, Typography } from '@mui/material';
import { IEnhancedTableToolbarProps } from '../../interfaces/IEnhancedTableToolbarProps';

const EnhancedTableToolbar = (props: IEnhancedTableToolbarProps) => {
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
        <div className="flex flex-col gap-1 px-5 pt-4 w-full bg-blackz">
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
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
