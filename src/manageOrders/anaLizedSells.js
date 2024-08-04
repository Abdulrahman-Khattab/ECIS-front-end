import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, TextField, Autocomplete, Grid, Typography } from '@mui/material';
import { useGlobalOrderContext } from './ordersContext';
import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';

const AnalizedSellsPage = () => {
  const {
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    analizedData,
    uniqueDays,
    uniqueMonth,
    uniqueYear,
    productNames,
    productQuantityAndNames,
    prudctPrices,
    totalRevenue,
  } = useGlobalOrderContext();

  // Format price

  const formatRevenuePrice = () => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(totalRevenue);
  };

  const data = {
    labels: productNames,

    datasets: [
      {
        label: 'product that have been sold',
        data: productQuantityAndNames,
        prices: prudctPrices,
        backgroundColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(255,99,132,0.4)',
          'rgba(255,206,86,0.4)',
          'rgba(54,162,235,0.4)',
          'rgba(153,102,255,0.4)',
        ],
        hoverBorderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            const index = context.dataIndex;

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += 'Quantity: ' + context.parsed.y;
            }
            if (
              data.datasets[context.datasetIndex].prices[index] !== undefined
            ) {
              label +=
                ', Product Revenue: $' +
                data.datasets[context.datasetIndex].prices[index].toFixed(2);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ paddingLeft: '1rem' }}>
      <NavBar></NavBar>
      <CartNav />
      <Box sx={{ width: '90%', marginTop: '6rem' }}>
        {' '}
        <Bar data={data} options={options} />{' '}
      </Box>
      <Box>
        <Grid
          marginTop='2rem'
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
            <Autocomplete
              freeSolo
              options={uniqueYear}
              onChange={(event, newValue) => {
                setYear(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='السنة '
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
            <Autocomplete
              freeSolo
              options={uniqueMonth}
              onChange={(event, newValue) => {
                setMonth(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='الشهر'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setMonth(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} width='20%' padding='2rem'>
            <Autocomplete
              freeSolo
              options={uniqueDays}
              onChange={(event, newValue) => {
                setDay(newValue || event.target.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='اليوم'
                  required
                  variant='outlined'
                  margin='dense'
                  onChange={(event, newValue) => {
                    setDay(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          color='#4caf50'
          sx={{ fontSize: '1.25rem', marginBottom: '2rem' }}
        >
          {formatRevenuePrice()} : الوارد الكلي
        </Typography>
      </Box>
    </Box>
  );
};

export default AnalizedSellsPage;
