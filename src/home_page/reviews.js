import React from 'react';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Box, Typography, Rating, Avatar, Grid } from '@mui/material';

const data = [
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
  {
    name: 'Abdulrahman Ammar',
    desc: 'Oh my god best product ever never forever it existed if this product litrelaly save my life I hope everyone give moeny to this company ',
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '3rem',
        textAlign: 'center',
      }}
    >
      <Typography fontSize='24px' fontWeight='700'>
        what people are saying ?{' '}
      </Typography>
      <Grid container justifyContent='center' alignItems='center'>
        {data.map((review) => {
          return (
            <Grid
              item
              sx={{
                bgcolor: 'white',
                textAlign: 'start',
                padding: '16px',
                width: '100%',
              }}
              xs={12}
              sm={6}
              md={3}
              spacing={12}
              margin='1rem'
            >
              <Rating
                readOnly
                value={review.rating}
                sx={{ marginBottom: '1rem' }}
              />
              <Typography sx={{ marginBottom: '1rem' }}>
                {review.desc}
              </Typography>
              <Avatar sx={{ bgcolor: deepPurple[500], marginBottom: '1rem' }}>
                {review.name[0]}
              </Avatar>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Reviews;
