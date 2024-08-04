import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useGlobalPrdouctContext } from '../product_page/productContext';
import NA from '../static_resource/NA.png';

const data2 = [
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
  {
    name: 'air condition',
    productNumbers: 5,
    imageValue:
      'https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',
  },
];

const Product_homePage = () => {
  const { data } = useGlobalPrdouctContext();
  const slicedData = data.slice(31, 35);

  return (
    <Box
      width='75%'
      margin='auto'
      sx={{
        marginTop: '6rem',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: 'white', padding: '30px' }}
      >
        {slicedData.map((item) => {
          const { name, sellPrice } = item;
          let { image } = item;
          image = image === '/uploads/example.jpeg' ? NA : image;
          return (
            <Grid item lg={3} md={4} xs={6} sm={6}>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                sx={{ marginBottom: '16px' }}
              >
                <img src={image} alt='image' width='70%' />
                <Typography textAlign='center' sx={{ fontWeight: '700' }}>
                  {name}
                </Typography>
                <Typography textAlign='center'>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(sellPrice)}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Product_homePage;
