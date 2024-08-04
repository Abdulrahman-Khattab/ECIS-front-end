import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import home_page2 from '../static_resource/2.jpg';
import clothes_icon from '../static_resource/clothes.png';
import electrical_icon from '../static_resource/electrical.png';
import meat_icon from '../static_resource/meat.jpg';
import phone_icon from '../static_resource/phone.png';
import shoes_icon from '../static_resource/shoes.png';
import watches_icon from '../static_resource/watches.png';
import perfume_icon from '../static_resource/perfume.png';
import groceries_icon from '../static_resource/groceries.png';

import { useGlobalPrdouctContext } from '../product_page/productContext';

const Home_body = () => {
  const { setCategory } = useGlobalPrdouctContext();
  const navigate = useNavigate();

  const imgObject = [
    {
      icon: clothes_icon,
      text: 'clothes',
    },
    {
      icon: electrical_icon,
      text: 'electrical appliances',
    },
    { icon: meat_icon, text: 'meats' },
    { icon: phone_icon, text: 'phone' },
    { icon: shoes_icon, text: 'shoes' },
    { icon: watches_icon, text: 'watches' },
    { icon: perfume_icon, text: 'perfume' },
    { icon: groceries_icon, text: 'Nutritional' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '6rem',
        marginLeft: '40px',
        marginBottom: '60px',
      }}
    >
      <Grid container spacing={12}>
        {imgObject.map((item) => {
          return (
            <Grid
              item
              xl={3}
              lg={3}
              md={4}
              sm={6}
              sx={{
                width: '100%',
                ':hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s',
                  cursor: 'pointer',
                },

                '&:hover': {
                  transition: 'transform 0.3s',
                },
              }}
              onClick={async () => {
                await setCategory(item.text);
                navigate('/المنتجات');
              }}
            >
              <img
                src={item.icon}
                style={{ width: '60%', transition: 'transform 0.3s' }}
                alt=''
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home_body;
