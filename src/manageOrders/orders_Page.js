import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  Grid,
  Autocomplete,
} from '@mui/material';
import NavBar from '../general_component/Navbar';
import { Link } from 'react-router-dom';
import { useGlobalOrderContext } from './ordersContext';
import { useGlobalCreateProductContext } from '../manageProducts/createProductContext';
import { useNavigate } from 'react-router-dom';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const OrdersPage = () => {
  const {
    columns,
    orders,
    getSingleOrdersRequest,
    transactionID,
    setTransactionID,
    handleTransactionID,
    getTransactionInformationRequest,
  } = useGlobalOrderContext();
  const navigate = useNavigate();

  let rows = orders;

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    modal,
    handleOpenModal,
    handleCloseModal,
  } = useGlobalCreateProductContext();

  return (
    <Box>
      <Box>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />
        <Modal open={modal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              are you sure you want to delete this Purchase ?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                textAlign: 'center',
              }}
            >
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  handleCloseModal();
                  window.location.reload();
                }}
              >
                yes
              </Button>
              <Button
                onClick={handleCloseModal}
                variant='contained'
                color='success'
              >
                no
              </Button>
            </Box>
          </Box>
        </Modal>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
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

                  {/* New Column for the Button */}
                  <TableCell key='orderItems' align='right'>
                    قائمة مشتريات الطلب
                  </TableCell>
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

                        {/* Button for the "order Items" column */}
                        <TableCell
                          key='orderItems'
                          align='right'
                          sx={{
                            minWidth: 250,
                          }}
                        >
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={async () => {
                              // Assuming orderId is a unique identifier in your order data
                              await getSingleOrdersRequest(row._id);
                              navigate(`/معلومات المبيعات/${row._id}`);
                            }}
                          >
                            عرض مشتريات الطلب
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Box sx={{ marginTop: '2rem' }}>
          <TextField
            variant='outlined'
            size='small'
            value={transactionID}
            onChange={handleTransactionID}
            label='user payment ID	 '
            sx={{ width: '25%' }}
          />{' '}
          <Button
            variant='contained'
            onClick={async () => {
              await getTransactionInformationRequest();
              navigate(`/معلومات عمليه نقل الاموال/${transactionID}`);
            }}
          >
            تحقق من معلومات عملية الدفع{' '}
          </Button>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default OrdersPage;
