import react, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Switch,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { useGlobalPrdouctContext } from './productContext';
import NA from '../static_resource/NA.png';
import { useGlobalCartContext } from '../cart_Page/cart_context';
import { Link } from 'react-router-dom';
import { useGlobalSingleProductContext } from '../singleProduct_Page/singleProductContext';

const Product_container = () => {
  const {
    uniqueCategory,
    data,
    uniqueCompany,
    uniqueColors,
    company,
    setCompany,
    color,
    setColor,
    handleColorChange,
    handleCompanyChange,
    name,
    handleNameChange,
    handlePriceChange,
    price,
    clearFilter,
    category,
    handlecategoryClick,
    uniqueDepartment,
    handleDepartmentChange,
    department,
  } = useGlobalPrdouctContext();

  const { handleOpenCart, addToCart } = useGlobalCartContext();

  const { idTaker } = useGlobalSingleProductContext();

  return (
    <Box
      sx={{
        marginTop: '6rem',
        display: 'grid',
        gridTemplateColumns: '20% 80%',
      }}
    >
      {/* First Column */}
      <Box
        sx={{
          borderRight: '1px solid #ccc', // Add a border between columns
          padding: '1rem', // Add some padding for better appearance
          textAlign: 'start',
        }}
      >
        <Typography sx={{ fontSize: '1.5rem', textAlign: 'start' }}>
          التصنيفات
        </Typography>
        {/* CATEGORY */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,

            display: 'block',
            alignItems: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {uniqueCategory.map((category, index) => (
            <li key={index} style={{ display: 'block' }}>
              <Button sx={{ display: 'block' }} onClick={handlecategoryClick}>
                {category}
              </Button>
            </li>
          ))}
        </ul>

        <Box sx={{ marginTop: '3rem', display: 'block' }}>
          <Typography
            sx={{
              marginBottom: '1rem',
              fontSize: '1.5rem',
              textAlign: 'start',
            }}
          >
            فلاتر البحث
          </Typography>
          <TextField
            label='اسم المنتج'
            type='search'
            value={name}
            onChange={handleNameChange}
            variant='filled'
          />
          <FormControl sx={{ marginTop: '1rem', width: '80%' }}>
            <InputLabel>الشركة</InputLabel>
            <Select value={company} onChange={handleCompanyChange}>
              {uniqueCompany.map((company) => {
                return <MenuItem value={company}>{company}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: '1rem', width: '80%' }}>
            <InputLabel>اللون</InputLabel>
            <Select value={color} onChange={handleColorChange}>
              {uniqueColors.map((colorItem) => {
                return <MenuItem value={colorItem}>{colorItem}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: '1rem', width: '80%' }}>
            <InputLabel>القسم</InputLabel>
            <Select value={department} onChange={handleDepartmentChange}>
              {uniqueDepartment.map((departmentt) => {
                return <MenuItem value={departmentt}>{departmentt}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <Slider
            sx={{ width: '80%' }}
            max={200000}
            aria-label='Default'
            valueLabelDisplay='auto'
            onChange={handlePriceChange}
            value={price}
          />

          <Button
            variant='contained'
            sx={{ textAlign: 'start', marginTop: '1rem' }}
            onClick={clearFilter}
          >
            ازالة فلاتر البحث
          </Button>
        </Box>
      </Box>

      {/* Second Column */}
      <Box sx={{ padding: '1rem' }}>
        {/* Placeholder for products (replace with your actual product display logic) */}
        {/*<Typography variant='h5'>Product List</Typography>*/}
        {/* Add your product display logic here */}
        <Grid container>
          {data.map((item) => {
            const {
              name,
              sellPrice,
              description,
              averageRating,
              image,
              _id,
              inventory,
            } = item;
            return (
              <Grid item xs={6} md={4} padding={1}>
                <Box sx={{ width: '60%' }}>
                  <img
                    src={image == '/uploads/example.jpeg' ? NA : image}
                    alt='image'
                    style={{
                      width: '100%',
                      padding: '1rem',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: '60%',
                    paddingLeft: '1.5rem',
                  }}
                >
                  <Rating
                    defaultValue={averageRating}
                    precision={0.5}
                    readOnly
                    sx={{ fontSize: '1rem', marginBottom: '8px' }}
                  />
                  <Typography
                    component='p'
                    sx={{ fontWeight: '600', marginBottom: '8px' }}
                    color='main'
                  >
                    {name}
                  </Typography>
                  <Typography component='p' sx={{ fontWeight: '600' }}>
                    {description}
                  </Typography>
                  <Typography component='p'>
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(sellPrice)}{' '}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {inventory !== 0 ? (
                      <Button
                        variant='contained'
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        اضف الئ العربة{' '}
                      </Button>
                    ) : (
                      <Typography
                        color='primary.main'
                        sx={{ fontSize: '1.25rem' }}
                      >
                        {' '}
                        نفذت الكمية{' '}
                      </Typography>
                    )}

                    <Link to={`/SingleProductPage/${_id}`}>
                      <Button
                        variant='contained'
                        onClick={() => {
                          idTaker(_id);
                        }}
                      >
                        التفاصيل{' '}
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Product_container;
