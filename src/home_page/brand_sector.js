import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import logo_brand_1 from '../static_resource/logo_brand_1.png';
import logo_brand_2 from '../static_resource/logo_brand_2.jpg';
import logo_brand_3 from '../static_resource/logo_brand_3.png';
const dataIcons = [
  logo_brand_1,
  logo_brand_2,
  logo_brand_1,
  logo_brand_2,
  logo_brand_1,
  logo_brand_2,
];

const Brand_sector = () => {
  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: '6rem',
        backgroundColor: 'white',
        padding: '20px',

        width: '80%',
      }}
    >
      <Typography
        fontSize='24px'
        sx={{ marginBottom: '1rem', textTransform: 'capitalize' }}
      >
        top brands
      </Typography>
      <Grid container spacing={6}>
        {dataIcons.map((logo) => {
          return (
            <Grid item sm={6} md={2}>
              <img
                src={logo}
                alt='logo'
                style={{
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Brand_sector;
