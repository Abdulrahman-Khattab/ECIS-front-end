import React from 'react';
import { Box, Button, Grid, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductSector = ({ data, startSlice, endSlice }) => {
  const navigate = useNavigate();

  const slicedData = data.slice(startSlice, endSlice);

  return (
    <Box
      sx={{
        marginTop: '6rem',
        backgroundColor: 'white',
        paddingTop: '10px',
        padding: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '80%',

          marginBottom: '2rem',
        }}
      >
        <Typography textTransform='capitalize' variant='h5'>
          البضائع
        </Typography>
        <Button
          sx={{
            fontWeight: '700',
            textTransform: 'capitalize',
            marginLeft: '1rem',
          }}
          disableFocusRipple
          onClick={() => {
            navigate('/المنتجات');
          }}
        >
          {' '}
          see more
        </Button>
      </Box>
      <Box>
        <Grid container>
          {slicedData.map((item) => {
            const { description, image, sellPrice, averageRating } = item;

            return (
              <Grid sm={6} md={4} lg={3} item sx={{ marginBottom: '4rem' }}>
                <img
                  src={image}
                  alt=''
                  width='80%'
                  height='50%'
                  style={{ objectFit: 'contain', marginBottom: '1rem' }}
                />
                <Box width='80%' marginLeft='1.5rem'>
                  <Rating value={averageRating} readOnly size='small' />
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: '700',
                      marginBottom: '6px',
                      fontFamily: 'Open Sans,sans-serif',
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography>
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
    </Box>
  );
};

export default ProductSector;
