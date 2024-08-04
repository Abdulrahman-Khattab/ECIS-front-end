import {
  Box,
  Grid,
  FormControlLabel,
  Button,
  TextField,
  Typography,
  Checkbox,
  Link,
  Avatar,
  Paper,
  Autocomplete,
  Modal,
} from '@mui/material';

import { useState } from 'react';
import { useGlobalAuthContext } from './authContext';
import { useNavigate } from 'react-router-dom';
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

const Register = () => {
  const {
    user,
    setUser,
    boxValue,
    setBoxValue,
    registerRequest,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    info,
    modal,
    handleCloseModal,
    modalText,
    handleOpenModal,
  } = useGlobalAuthContext();

  const navigate = useNavigate();

  return (
    <Box>
      <Modal open={modal} onClose={handleCloseModal}>
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
            <Button onClick={handleCloseModal} variant='contained' color='info'>
              ok
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',

          height: '100vh',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            mx: 4,
            my: 8,
            alignItems: 'center',
            flexDirection: 'column',
            width: '400px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component='h2'>عمل حساب </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              name='name'
              id='name'
              type='text'
              label='الأسم'
              required
              value={user.name}
              onChange={handleNameChange}
              autoFocus
              fullWidth
            />

            <TextField
              sx={{ mt: 2 }}
              name='email'
              id='email'
              type='email'
              label='الأيميل'
              required
              value={user.email}
              onChange={handleEmailChange}
              autoFocus
              fullWidth
            />

            <TextField
              sx={{ mt: 2 }}
              name='password'
              id='password'
              type='password'
              label='كلمة السر'
              required
              value={user.password}
              onChange={handlePasswordChange}
              autoFocus
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setBoxValue(e.target.checked);
                  }}
                />
              }
              label='الموافقة علئ جميع الشروط '
            />

            <Button
              type='button'
              fullWidth
              variant='contained'
              onClick={async () => {
                await registerRequest(navigate);
                window.location.reload();
              }}
            >
              {' '}
              اصنع حسابك{' '}
            </Button>
            <Grid container sx={{}}>
              <Grid item>
                <Link href='/تسجيل الدخول' variant='body1' underline='none'>
                  هل لديك حساب ؟ قم بتسجيل الدخول
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default Register;
