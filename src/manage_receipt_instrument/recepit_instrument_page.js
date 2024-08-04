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
import { useGlobalRecepitInstrument } from './recepit_Instrument_context';
import { useGlobalCreateProductContext } from '../manageProducts/createProductContext';
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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Recepit_instrument_page = () => {
  const {
    recepit_instrument_data,
    unique_receipt_instrument_Date,
    unique_vendor_receipt_instrument,
    unique_moneyTransferWay,
    unique_moneyTransferDate,
    listNumber,
    setListNumber,
    vendor_receipt_instrument,
    set_vendor_receipt_instrument,
    receipt_instrument_Date,
    set_receipt_instrument_Date,
    handleListNumberChange,
    columns,
    deleteID,
    handleDeleteIDChange,
    deleteRecepitInstrumentRequest,
    updateID,
    setUpdateID,
    handleUpdateId,
    getRecepitInformationToUpdate,
    single_recepit_instrument_data,
    single_recepit_instrument_modal,
    set_single_recepit_instrument_data,
    set_single_recepit_instrument_modal,
    handle_single_recepit_instrument_close_modal,
    handle_single_recepit_instrument_open_modal,
  } = useGlobalRecepitInstrument();

  let rows = recepit_instrument_data;

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    modal,
    handleOpenModal,
    handleCloseModal,
  } = useGlobalCreateProductContext();

  const {
    _id: single_recepiet_instrumnet_id,
    listNumber: single_recepiet_instrumnet_listNumber,
    receipt_instrument_updated_info_Date:
      single_recepit_instrumnet_updated_info_date,
    receipt_instrument_Date: single_receipt_instrument_Date,
    vendor_receipt_instrument: single_vendor_receipt_instrument,
    receipt_instrument_sum: single_receipt_instrument_sum,
    adminstrator: single_recepit_instrumnet_adminstrator,
    moneyTransferWay: single_recpit_instrumnet_moneyTransferWay,
    moneyTransferCode: single_recepit_instrumnet_money_transfer_code,
    moneyTransferDate: single_recepit_instrument_moneyTransferDate,
    receipt_instrument_Date_Entery: single_receipt_instrument_Date_Entery,
  } = single_recepit_instrument_data;

  return (
    <Box>
      <Box>
        <Modal open={modal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              هل انت متاكد أنك تريد حذف وصل القبض
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
                  deleteRecepitInstrumentRequest();
                  handleCloseModal();
                  window.location.reload();
                }}
              >
                نعم
              </Button>
              <Button
                onClick={handleCloseModal}
                variant='contained'
                color='success'
              >
                لا
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={single_recepit_instrument_modal}
          onClose={handle_single_recepit_instrument_close_modal}
        >
          <Box
            sx={{
              ...style2,
              width: '500px',
              height: '400px',
              textAlign: 'center',
              textTransform: 'capitalize',
              fontSize: '1rem',
            }}
          >
            <Box>
              {' '}
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_recepiet_instrumnet_id} :معرف وصل القبض
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                رقم القائمه : {single_recepiet_instrumnet_listNumber}
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_recepit_instrumnet_updated_info_date} : تاريخ التعديل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_receipt_instrument_Date} : تاريخ عمل الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_vendor_receipt_instrument} : المورد
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_recepit_instrumnet_adminstrator} : معرف الذي ادخل الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(single_receipt_instrument_sum)}
                : اموال وصل القبض
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {single_recpit_instrumnet_moneyTransferWay} : عملية تحويل
                الاموال
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {' '}
                {single_recepit_instrumnet_money_transfer_code} : كود عملية
                التحويل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {' '}
                {single_recepit_instrument_moneyTransferDate} : تاريخ تحويل
                الاموال
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {' '}
                {single_receipt_instrument_Date_Entery} : تاريخ ادخال الوصل
              </Typography>
            </Box>
          </Box>
        </Modal>

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
                        onClick={async () => {
                          await set_single_recepit_instrument_data(row);
                          set_single_recepit_instrument_modal(true);
                        }}
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
            rowsPerPageOptions={[10, 20]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box>
          <Grid
            marginTop='2rem'
            container
            spacing={2}
            sx={{
              justifyContent: 'center',
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
              <Autocomplete
                freeSolo
                value={vendor_receipt_instrument}
                options={unique_vendor_receipt_instrument}
                onChange={(event, newValue) => {
                  set_vendor_receipt_instrument(newValue || event.target.value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='المورد'
                    required
                    variant='outlined'
                    margin='dense'
                    onChange={(e) => {
                      set_vendor_receipt_instrument(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
              <Autocomplete
                freeSolo
                value={receipt_instrument_Date}
                options={unique_receipt_instrument_Date}
                onChange={(event, newValue) => {
                  set_receipt_instrument_Date(newValue || event.target.value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='تاريخ عمل الوصل'
                    required
                    variant='outlined'
                    margin='dense'
                    onChange={(event, newValue) => {
                      set_receipt_instrument_Date(event.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
              <TextField
                label='رقم الوصل '
                type='number'
                required
                variant='outlined'
                margin='dense'
                value={listNumber}
                sx={{ width: '100%' }}
                onChange={(e) => {
                  setListNumber(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          {/*see single Product   */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              value={deleteID}
              onChange={handleDeleteIDChange}
              size='small'
              label='معرف الوصل'
              sx={{ width: '25%' }}
            />{' '}
            <Button variant='contained' color='error' onClick={handleOpenModal}>
              حذف وصل قبض{' '}
            </Button>
          </Box>
          {/*see single Product   */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              variant='outlined'
              size='small'
              value={updateID}
              onChange={handleUpdateId}
              label='معرف الوصل '
              sx={{ width: '25%' }}
            />
            <Link
              to={`/تعديل وصل قبض/${updateID}`}
              style={{ textDecoration: 'none ' }}
            >
              {' '}
              <Button
                color='warning'
                variant='contained'
                onClick={async () => {
                  await getRecepitInformationToUpdate();
                }}
              >
                تعديل وصل قبض{' '}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default Recepit_instrument_page;
