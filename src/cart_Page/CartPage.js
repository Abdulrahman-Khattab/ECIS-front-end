import React from 'react';
import NavBar from '../general_component/Navbar';
import CartItemTable from './cartItemTable';
import CartTotalTable from './cartTotalTable';
import CartTable from './cartTable';
import { Divider, Modal, Typography, Button, Box } from '@mui/material';
import { useGlobalCartContext } from './cart_context';
import { Link } from 'react-router-dom';
import CartNav from './cart';
import Footer_section from '../home_page/footer_section';
import { useGlobalUserManagment } from '../userManagment/userManagmentContext';

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

const CartPage = () => {
  const {
    handleCloseModal,
    handleOpenModal,
    modal,
    setModal,
    createOrderRequest,
    paymentURL,
  } = useGlobalCartContext();

  const { currentUserInfo } = useGlobalUserManagment();

  const { _id: id, name, role, email } = currentUserInfo;

  return (
    <>
      <NavBar
        pages={['products', 'Pricing', 'Blog', 'potato']}
        settings={['Profile', 'Account', 'Dashboard', 'Logout']}
      ></NavBar>
      <CartNav />
      <CartTable />
      <Divider sx={{ marginTop: '4rem', marginBottom: '4rem' }} />
      <CartTotalTable />

      <Modal open={modal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400, height: 100, textAlign: 'center' }}>
          {id === undefined ? (
            <Box>
              {' '}
              <Typography textTransform='capitalize' fontSize='1.25rem'>
                قم بتسجيل الدخول لاكمال عملية التسوق
              </Typography>
              <Box
                sx={{
                  marginTop: '1rem',
                }}
              >
                <Link to='/تسجيل الدخول' style={{ textDecoration: 'none' }}>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => {
                      handleCloseModal();
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
              </Box>{' '}
            </Box>
          ) : (
            <Box>
              {' '}
              <Typography textTransform='capitalize' fontSize='1.25rem'>
                قم بأكمال عملية الدفع
              </Typography>
              <Box
                sx={{
                  marginTop: '1rem',
                }}
              >
                <Link to={paymentURL} style={{ textDecoration: 'none' }}>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => {
                      handleCloseModal();
                    }}
                  >
                    نعم
                  </Button>
                </Link>
              </Box>{' '}
            </Box>
          )}
        </Box>
      </Modal>
      <Footer_section />
    </>
  );
};

export default CartPage;
