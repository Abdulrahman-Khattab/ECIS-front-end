import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Grid, Typography, Input, Modal } from '@mui/material';
import { useGlobalPurchaseContext } from './purchaseContext';

import NavBar from '../general_component/Navbar';
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

const UpdatePurchase = () => {
  const {
    uniqueVendor,

    uniqueDate,
    updatePurchaseSum,
    updateListNumber,
    setUpdateListNumber,
    setUpdatePurchaseSum,
    handleUpdateListNumber,
    handleUpdatePurchaseSum,
    updatePuchaseDate,
    setUpdatePurchaseDate,
    updateVendor,
    setUpdateVendor,
    updatePurchaseRequest,
    modal2,
    handleCloseModal2,
    handleOpenModal2,
    setModal2,
    modalText,
  } = useGlobalPurchaseContext();

  return (
    <Box>
      <Box>
        <Modal open={modal2} onClose={handleCloseModal2}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              {modalText}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: '1rem',
              }}
            >
              <Button
                onClick={() => {
                  handleCloseModal2();
                  window.location.reload();
                }}
                variant='contained'
                color='info'
              >
                ok
              </Button>
            </Box>
          </Box>
        </Modal>

        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />

        <Box paddingTop='8rem' color='primary.main'>
          <Typography sx={{ textTransform: 'capitalize', fontSize: '1.25rem' }}>
            هذه الصفحة مسموح رؤيتها فقط للمدير و المشرف
          </Typography>

          <Typography
            sx={{
              textTransform: 'capitalize',
              marginTop: '1.25rem',
              fontSize: '1.25rem',
            }}
          >
            تعديل وصل الشراء{' '}
          </Typography>
        </Box>

        <Grid
          marginTop='2rem'
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            textTransform: 'capitalize',
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              freeSolo
              options={uniqueVendor}
              value={updateVendor}
              onChange={(event, newValue) => {
                setUpdateVendor(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='الشركه المورده'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event) => {
                    setUpdateVendor(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              options={uniqueDate}
              value={updatePuchaseDate}
              onChange={(event, newValue) => {
                setUpdatePurchaseDate(newValue || event.target.value);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='تاريخ عمل وصل'
                  variant='outlined'
                  required
                  type='text'
                  margin='dense'
                  onChange={(event) => {
                    setUpdatePurchaseDate(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <TextField
              sx={{ width: '100%' }}
              label='مبلغ الوصل'
              variant='outlined'
              required
              type='number'
              margin='dense'
              value={updatePurchaseSum}
              onChange={handleUpdatePurchaseSum}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <TextField
              sx={{ width: '100%' }}
              label='رقم الوصل'
              variant='outlined'
              required
              type='number'
              margin='dense'
              value={updateListNumber}
              onChange={handleUpdateListNumber}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            display: 'flex',
            margin: 'auto',
            padding: '1rem',
            fontSize: '1rem',
          }}
          variant='contained'
          onClick={() => {
            updatePurchaseRequest();
          }}
        >
          تعديل وصل الشراء{' '}
        </Button>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default UpdatePurchase;
