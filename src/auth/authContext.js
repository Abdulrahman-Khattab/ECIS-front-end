import { Typography } from '@mui/material';
import React, { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';
const loginURL = 'http://localhost:5000/shop/v1/api/auth/login';
const registerURL = 'http://localhost:5000/shop/v1/api/auth/register';
const registerSpecialUserURL =
  'http://localhost:5000/shop/v1/api/auth/registerSpecialUser';

const logoutURL = 'http://localhost:5000/shop/v1/api/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
  });
  const [boxValue, setBoxValue] = useState(false);
  const [info, setInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  const ErrorMessage = () => {
    return <Box color='primary.main'>please Enter all values correctly</Box>;
  };

  //REGISTER
  const registerRequest = async (navigate) => {
    try {
      const response = await fetch(registerURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // Add any other headers as needed
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        await setInfo(responseData);
        navigate('/homePage');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
        setModalText(`Error:${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalText(`Error:${error}`);
      setModal(true);
    }
  };

  //REGISTER SPECIAL USER
  const registerSpecialUserRequest = async (navigate) => {
    try {
      const response = await fetch(registerSpecialUserURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // Add any other headers as needed
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        await setInfo(responseData);
        navigate('/الصفحه الرئيسيه');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalText(`Error: ${error} `);
      setModal(true);
    }
  };

  //LOGIN
  const loginRequest = async (navigate) => {
    try {
      const response = await fetch(loginURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // Add any other headers as needed
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        await setInfo(responseData);
        navigate('/الصفحه الرئيسيه');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalText(`Error: ${error} `);
      setModal(true);
    }
  };

  //LOGOUT
  const logoutRequest = async (navigate) => {
    try {
      const response = await fetch(logoutURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        navigate('/الصفحه الرئيسيه');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalText(`Error: ${error} `);
      setModal(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        boxValue,
        setUser,
        setBoxValue,
        loginRequest,
        handleEmailChange,
        handlePasswordChange,
        handleNameChange,
        handleRoleChange,
        ErrorMessage,
        info,
        registerRequest,
        registerSpecialUserRequest,
        logoutRequest,
        modal,
        handleCloseModal,
        handleOpenModal,
        modalText,
        setModalText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useGlobalAuthContext };
