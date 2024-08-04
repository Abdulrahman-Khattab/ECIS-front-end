import React from 'react';
import { useGlobalUserManagment } from './userManagmentContext';
import { useGlobalAuthContext } from '../auth/authContext';
import { Typography, Box, Button, TextField, Grid, Modal } from '@mui/material';
import NavBar from '../general_component/Navbar';
import { Link } from 'react-router-dom';
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

const CurrentUserInfo = () => {
  const navigate = useNavigate();

  const {
    currentUserInfo,
    newName,
    newEmail,
    oldPassword,
    newPassword,
    handlenewEmailChange,
    handlenewNameChange,
    handleNewPasswordChange,
    handleOldPasswordChange,
    updateCurrentUserInfoRequest,
    updateCurrentUserPasswordRequest,
    modal2,
    handleCloseModal,
    modalText2,
  } = useGlobalUserManagment();

  const { logoutRequest } = useGlobalAuthContext();
  const { _id: id, name, role, email } = currentUserInfo;
  return (
    <Box>
      <Box>
        <Modal open={modal2} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
            <Typography textTransform='capitalize' fontSize='1.25rem'>
              {modalText2}
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
                onClick={handleCloseModal}
                variant='contained'
                color='info'
              >
                نعم
              </Button>
            </Box>
          </Box>
        </Modal>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />
        <Box
          sx={{
            display: 'grid',
            placeItems: 'start',
            padding: '2rem',
            marginTop: '4rem',
          }}
        >
          {/*info*/}

          <Box
            sx={{
              display: 'flex',
              textAlign: 'start',
              flexDirection: 'column',
              padding: ' 2rem',
              textTransform: 'capitalize',
              marginBottom: '2rem',
            }}
          >
            <Typography sx={{ marginTop: '2rem' }}>{id} : المعرف</Typography>
            <Typography sx={{ marginTop: '1rem' }}>{name} : الأسم</Typography>
            <Typography sx={{ marginTop: '1rem' }}>
              {email} : الأيميل
            </Typography>
            <Typography sx={{ marginTop: '1rem' }}>
              {role}: نوع المستخدم
            </Typography>
            <Link
              to='/الصفحه الرئيسيه'
              style={{
                textDecoration: 'none',
                textTransform: 'capitalize',
                marginTop: '3rem',
              }}
            >
              <Button variant='contained'>انتقل للصفحة الرئيسيه</Button>
            </Link>
          </Box>

          <Grid container width='80%'>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                value={newName}
                onChange={handlenewNameChange}
                label='الأسم'
                sx={{ width: '90%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                value={newEmail}
                type='email'
                onChange={handlenewEmailChange}
                label='الايميل'
                sx={{ width: '90%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                onClick={async () => {
                  await updateCurrentUserInfoRequest();
                  await logoutRequest(navigate);
                  navigate('/تسجيل الدخول');
                }}
                variant='contained'
                size='large'
              >
                تعديل معلومات المستخدم
              </Button>
            </Grid>
          </Grid>

          <Grid container width='80%' marginTop='1.5rem'>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                value={oldPassword}
                onChange={handleOldPasswordChange}
                label='كلمة السر السابقة'
                sx={{ width: '90%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                value={newPassword}
                onChange={handleNewPasswordChange}
                label='كلمة السر الجديدة'
                type='password'
                sx={{ width: '90%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                onClick={async () => {
                  await updateCurrentUserPasswordRequest(navigate);
                  await logoutRequest(navigate);
                }}
                variant='contained'
                size='large'
              >
                تحديث كلمة السر
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default CurrentUserInfo;
