import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import NA from '../static_resource/NA.png';
import { useGlobalCreateProductContext } from './createProductContext';
import { useParams, Link } from 'react-router-dom';

import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';

const SingleProductInformation = () => {
  const { setProductID, productInfo } = useGlobalCreateProductContext();
  const { productID } = useParams();
  setProductID(productID);
  let {
    image,
    category,
    department,
    company,
    color,
    name,
    description,
    sellPrice,
    originalPrice,
    productExpirationDate,
    productUpdateDate,
    _id,
    inventory,
    averageRating,
    numOfReviews,
    user,
    productDateEntery,
    barcode,
  } = productInfo;

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
                originalPrice:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(originalPrice)}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                sellPrice:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(sellPrice)}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                productExpireation : {productExpirationDate}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                inventory : {inventory}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                barcode : {barcode}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                average Rating : {averageRating}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                Number of reveiws : {numOfReviews}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                creator ID : {user}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.5rem',

                  width: '100%',
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                }}
              >
                product ID : {_id}
              </Typography>
            </Box>
            <Divider sx={{ width: '70%', marginTop: '3rem' }} />
          </Box>
        </Box>
      </Box>
      <Footer_section />
    </Box>
  );
};

export default SingleProductInformation;
