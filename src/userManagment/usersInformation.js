import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, TextField, Button } from '@mui/material';
import { useGlobalUserManagment } from './userManagmentContext';
import NavBar from '../general_component/Navbar';
import { Link } from 'react-router-dom';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';

const UserInfo = () => {
  const {
    rows,
    columns,
    page,
    userUpdate,
    setUserUpdate,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdateIdChange,
    userId,
    setUserId,
    handleUserIdChange,
  } = useGlobalUserManagment();

  return (
    <Box>
      <Box>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5rem' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Box>
          {/*DELETE USER     <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              size='small'
              label='UserId'
              sx={{ width: '25%' }}
              value={userId}
              onChange={handleUserIdChange}
            />
            <Link
              to={`/SingleUser/${userId}`}
              style={{ textDecoration: 'none ' }}
            >
              {' '}
              <Button variant='contained'>getSingleUser info </Button>
            </Link>
          </Box> */}
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default UserInfo;
