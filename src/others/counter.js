import { useState } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import Header from './Header';

const Counter = () => {
  const [number, setNumber] = useState(0);

  const handleAddition = () => {
    setNumber(number + 1);
  };

  const handleSubtraction = () => {
    setNumber(number - 1);
  };

  return (
    <div>
      <Box marginBottom={10}>
        {' '}
        <Header />
      </Box>

      <Stack>
        <Box display={'flex'}>
          <Button onClick={handleAddition}>add</Button>
          <Typography sx={{ paddingTop: '6px' }}>{number}</Typography>
          <Button onClick={handleSubtraction}>subtract</Button>
        </Box>
      </Stack>
    </div>
  );
};

export default Counter;
