import React from 'react';

import { Box, Stack, Typography, Divider, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PaymentIcon from '@mui/icons-material/Payment';
const data = [
  {
    serviceName: 'شحن مجاني',
    desc: 'عند تسوقك ب 70 الف دينار او اكثر',
    icon: <LocalShippingIcon />,
  },
  {
    serviceName: 'متاحون علئ مدار الساعه',
    desc: `
تحتاج الئ مساعده اتصل بنا في اي وقت`,
    icon: <MessageIcon />,
  },
  {
    serviceName: `رضاك أمانتنا
`,
    desc: `إذا لم تكن راضيًا، يمكنك إرجاع المنتج واسترداد أموالك`,
    icon: <PublishedWithChangesIcon />,
  },
  {
    serviceName: `وسائل دفع امنه %100`,
    desc: 'يكون الدفع عن طريق زين كاش او عند استلام المنتج',
    icon: <PaymentIcon />,
  },
];

const Serivces = () => {
  return (
    <Grid
      container
      width='100%'
      margin='auto'
      sx={{
        border: 'solid 1px  #f4f4f4',
        backgroundColor: 'white',
        padding: '20px',
      }}
    >
      {data.map((itemN) => {
        return (
          <Grid item md={3} xs={6}>
            <Box sx={{ display: 'flex' }} color='primary.main'>
              {itemN.icon}
              <Box textAlign='center' sx={{ marginLeft: '8px' }}>
                <Typography variant='body1' color='black'>
                  {itemN.serviceName}
                  <Typography fontSize='12px' variant='body2' color='#A0A0A0'>
                    {itemN.desc}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Serivces;
