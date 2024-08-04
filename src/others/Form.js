import React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  Checkbox,
} from '@mui/material';
import Header from './Header';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (!name) {
      error.name = 'Please provide name';
    }

    if (!email) {
      error.email = 'Please provide email';
    }

    if (Object.keys.length === 0) {
      const userInfo = { name, email, checkedTerms, gender };
      console.log('User has been registered', userInfo);
      setName('');
      setEmail('');
      setGender('');
      setCheckedTerms(false);
    } else {
      setError(error);
    }
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Box>
        <Header />
      </Box>
      <form onSubmit={handleSubmit} style={{ width: '30%' }}>
        <Typography textAlign='center' variant='h3'>
          Form sample
        </Typography>

        <Box m={4} ml={0}>
          <TextField
            fullWidth
            variant='standard'
            placeholder='Name'
            type='text'
            error={error.name}
            helperText={error.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box m={4} ml={0}>
          {' '}
          <TextField
            fullWidth
            variant='standard'
            placeholder='Email'
            type='email'
            value={email}
            error={!error.email}
            helperText={error.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Checkbox
            checked={checkedTerms}
            onChange={(e) => setCheckedTerms(e.target.checked)}
          />
          <label htmlFor='checkedTerms'>accept term and services </label>
        </Box>

        <Box>
          <label htmlFor='gender'>male</label>
          <Radio
            checked={gender == 'male'}
            value='male'
            onChange={(e) => setGender(e.target.value)}
          />
        </Box>
        <Box>
          {' '}
          <label htmlFor='gender'>female</label>
          <Radio
            checked={gender == 'female'}
            value='female'
            onChange={(e) => setGender(e.target.value)}
          />
        </Box>
        <Button type='submit'>submit </Button>
      </form>
    </Box>
  );
};

export default Form;
