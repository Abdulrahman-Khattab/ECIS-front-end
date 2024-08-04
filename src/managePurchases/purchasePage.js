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
import { useGlobalPurchaseContext } from './purchaseContext';
import { useGlobalCreateProductContext } from '../manageProducts/createProductContext';
import Footer_section from '../home_page/footer_section';
import CartNav from '../cart_Page/cart';
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

const PurchasePage = () => {
  const {
    purchaseData,
    uniqueVendor,
    uniqueListNumber,
    uniqueDate,
    vendor,
    listNumber,
    purchaseDate,
    setVendor,
    setListNumber,
    setPurchaseDate,
    columns,
    handleDeleteID,
    deleteID,
    deletPurchaseRequest,
    handleUpdateID,
    updateID,
    setUpdateID,
    getPurchaseInformationToUpdate,
    singlePurchaseData,
    setSinglePurchaseData,
    singlePurchaseModal,
    setSinglePurchaseModal,
    handleCloseSinglePurchaseModal,
    handleOpenSinglePurchaseModal,
  } = useGlobalPurchaseContext();

  let rows = purchaseData;

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
    _id: singlePurchaseID,
    listNumber: singlePurchaseListNumber,
    purchaseDate: singlePurchaseDate,
    purchaseUpdatedInfoDate: SinglePurchaseUpdateDate,
    vendor: singlePurchaseVendor,
    purchaseSum: singlePurchaseSum,
    adminstrator: singlePurchaseAdminStraitor,
    purchaseDateEntery: singlePurchaseDateEntery,
  } = singlePurchaseData;

  return (
    <Box>
      <Box>
        <Modal open={modal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              هل انت متأكد انك تريد حذف وصل الشراء ؟
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
                  deletPurchaseRequest();
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
          open={singlePurchaseModal}
          onClose={handleCloseSinglePurchaseModal}
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
                {singlePurchaseID}: معرف الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {singlePurchaseVendor} :الشركه المورده
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {singlePurchaseListNumber} : رقم الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {singlePurchaseDate} : تاريخ عمل الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {singlePurchaseAdminStraitor} : معرف الذي ادخل الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {SinglePurchaseUpdateDate} : تاريخ تحديث الوصل
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
                }).format(singlePurchaseSum)}{' '}
                : مبلغ الوصل
              </Typography>
              <Typography
                sx={{
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '0.75rem',
                }}
              >
                {singlePurchaseDateEntery} : تاريخ ادخال الوصل
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
                          await setSinglePurchaseData(row);
                          setSinglePurchaseModal(true);
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
                options={uniqueVendor}
                onChange={(event, newValue) => {
                  setVendor(newValue || event.target.value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='الشركه المورده '
                    required
                    variant='outlined'
                    margin='dense'
                    onChange={(e) => {
                      setVendor(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
              <Autocomplete
                freeSolo
                options={uniqueDate}
                onChange={(event, newValue) => {
                  setPurchaseDate(newValue || event.target.value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='تاريخ شراء الوصل'
                    required
                    variant='outlined'
                    margin='dense'
                    onChange={(event, newValue) => {
                      setPurchaseDate(event.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
              <TextField
                label='رقم الوصل'
                type='number'
                required
                variant='outlined'
                margin='dense'
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
              size='small'
              value={deleteID}
              onChange={handleDeleteID}
              label='معرف الوصل'
              sx={{ width: '25%' }}
            />{' '}
            <Button variant='contained' color='error' onClick={handleOpenModal}>
              حذف وصل الشراء{' '}
            </Button>
          </Box>
          {/*see single Product   */}
          <Box sx={{ marginTop: '2rem' }}>
            <TextField
              value={updateID}
              variant='outlined'
              size='small'
              label='معرف الوصل '
              sx={{ width: '25%' }}
              onChange={handleUpdateID}
            />
            <Link
              to={`/تعديل وصل شراء/${updateID}`}
              style={{ textDecoration: 'none ' }}
            >
              {' '}
              <Button
                color='warning'
                variant='contained'
                onClick={async () => {
                  await getPurchaseInformationToUpdate();
                }}
              >
                تعديل وصل الشراء{' '}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default PurchasePage;
