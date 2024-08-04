import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Grid, Typography, Input, Modal } from '@mui/material';

import NavBar from '../general_component/Navbar';
import { useGlobalRecepitInstrument } from './recepit_Instrument_context';
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

const Update_recepit_instrument_Page = () => {
  const {
    update_vendor_receipt_instrument,
    set_update_vendor_receipt_instrument,
    update_receipt_instrument_sum,
    update_receipt_instrument_date,
    set_update_receipt_instrument_date,
    update_listNumber,
    update_moneyTransferWay,
    set_update_moneyTransferWay,
    update_moneyTransferDate,
    set_update_moneyTransferDate,
    handle_update_listNumber_change,
    handle_update_receipt_instrument_sum,
    updateRecepitInstrumentRequest,
    unique_receipt_instrument_Date,
    unique_vendor_receipt_instrument,
    unique_moneyTransferWay,
    unique_moneyTransferDate,
    modal2,
    handleCloseModal2,
    handleOpenModal2,
    setModal2,
    modalText,
    getRecepitInformationToUpdate,
    setUpdateID,
  } = useGlobalRecepitInstrument();

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
            هذه الصفحة مسموح رؤيتها فقط للمدير والمشرف
          </Typography>

          <Typography
            sx={{
              textTransform: 'capitalize',
              fontSize: '1.25rem',
              marginTop: '1.25rem',
            }}
          >
            تعديل وصل القبض
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
              options={unique_vendor_receipt_instrument}
              value={update_vendor_receipt_instrument}
              onChange={(event, newValue) => {
                set_update_vendor_receipt_instrument(
                  newValue || event.target.value
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='اسم الشركه المورده'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event) => {
                    set_update_vendor_receipt_instrument(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              options={unique_receipt_instrument_Date}
              value={update_receipt_instrument_date}
              onChange={(event, newValue) => {
                set_update_receipt_instrument_date(
                  newValue || event.target.value
                );
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='تاريخ عمل الوصل'
                  variant='outlined'
                  required
                  type='text'
                  margin='dense'
                  onChange={(event) => {
                    set_update_receipt_instrument_date(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              options={unique_moneyTransferWay}
              value={update_moneyTransferWay}
              onChange={(event, newValue) => {
                set_update_moneyTransferWay(newValue || event.target.value);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='طريقة تحويل الاموال'
                  variant='outlined'
                  required
                  type='text'
                  margin='dense'
                  onChange={(event) => {
                    set_update_moneyTransferWay(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} width='20%' padding='2rem'>
            <Autocomplete
              options={unique_moneyTransferDate}
              value={update_moneyTransferDate}
              onChange={(event, newValue) => {
                set_update_moneyTransferDate(newValue || event.target.value);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='وقت تحويل الاموال'
                  variant='outlined'
                  required
                  type='text'
                  margin='dense'
                  onChange={(event) => {
                    set_update_moneyTransferDate(event.target.value);
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
              value={update_receipt_instrument_sum}
              onChange={handle_update_receipt_instrument_sum}
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
              value={update_listNumber}
              onChange={handle_update_listNumber_change}
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
            updateRecepitInstrumentRequest();
          }}
        >
          تعديل وصل القبض
        </Button>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default Update_recepit_instrument_Page;
