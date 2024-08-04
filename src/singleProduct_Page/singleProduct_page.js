import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import NA from '../static_resource/NA.png';
import { useGlobalSingleProductContext } from './singleProductContext';
import { useGlobalCartContext } from '../cart_Page/cart_context';
import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';

const SingleProductPage = () => {
  let {
    name,
    sellPrice,
    department,
    description,
    category,
    image,
    company,
    color,
    singlePrdouctData,
  } = useGlobalSingleProductContext();

  const { addToCart } = useGlobalCartContext();

  image = image === '/uploads/example.jpeg' ? NA : image;

  return (
    <Box>
      <Box>
        <NavBar
          pages={['products', 'Pricing', 'Blog', 'potato']}
          settings={['Profile', 'Account', 'Dashboard', 'Logout']}
        ></NavBar>
        <CartNav />
        <Box sx={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
          {/*First Column*/}
          <Box>
            <Box
              sx={{
                width: '80%',
                padding: '4rem',
                paddingLeft: '8rem',
                paddingTop: '6rem',
              }}
            >
              <img src={image} alt='' style={{ width: '80%' }} />
            </Box>
          </Box>

          {/*Second column */}

          <Box sx={{ textTransform: 'capitalize', marginTop: '2rem' }}>
            {/* department - category info ...*/}
            <Box sx={{ width: '75%', paddingTop: '5rem' }}>
              <Typography
                sx={{ fontSize: '2rem', width: '100%', wordWrap: 'break-word' }}
              >
                product/{category}/{department}/{company}/{color}/{name}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '2rem',
                }}
              >
                {description}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                السعر: ${sellPrice}
              </Typography>

              {/*Buttons*/}

              <Button
                onClick={() => {
                  addToCart(singlePrdouctData);
                }}
                variant='contained'
                sx={{ marginTop: '2rem' }}
              >
                اضف الئ العربة
              </Button>
            </Box>
            <Divider sx={{ width: '70%', marginTop: '3rem' }} />
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default SingleProductPage;
