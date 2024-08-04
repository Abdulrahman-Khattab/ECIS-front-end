import React, { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';

const getUsersURL = 'http://localhost:5000/shop/v1/api/user';
const getCurrentUserURL = 'http://localhost:5000/shop/v1/api/user/currentUser';
const updateCurrentUserURL =
  'http://localhost:5000/shop/v1/api/user/updateUser';
const updatePasswordURL =
  'http://localhost:5000/shop/v1/api/user/updatePassword';

const UserManagmentContext = createContext();

const UserManagmentProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userId, setUserId] = useState('');
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalText2, setModalText2] = useState('');
  const [modal2, setModal2] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  const columns = [
    { id: '_id', label: 'المعرف', minWidth: 170 },
    { id: 'name', label: 'الأسم', minWidth: 100 },
    {
      id: 'email',
      label: 'الأيميل',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'role',
      label: 'العضوية',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'userUpdatedInfoDate',
      label: 'تحديث المعلومات',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'userDate',
      label: 'تاريخ التسجيل',
      minWidth: 170,
      align: 'right',
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlenewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlenewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // getUsersData

  const getUsersData = async () => {
    try {
      const response = await fetch(getUsersURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setRows(data);
      } else {
        console.log(response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // getCurrentData

  const getCurrentUserDataRequest = async () => {
    try {
      const response = await fetch(getCurrentUserURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUserInfo(data);
      } else {
        console.log(response.statusText);
        setModalText2(`Error: ${response.statusText} ${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update user information

  const updateCurrentUserInfoRequest = async () => {
    try {
      const response = await fetch(updateCurrentUserURL, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({ name: newName, email: newEmail }), // Convert object to JSON string
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setModalText(`User Information has been updated`);
        setModal(true);
      } else {
        console.log(response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // updatePassword

  const updateCurrentUserPasswordRequest = async (navigate) => {
    try {
      const response = await fetch(updatePasswordURL, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }), // Convert object to JSON string
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/login');
      } else {
        console.log(response.statusText);
        setModalText(`Error: ${response.statusText} ${response.status}`);
        setModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    getCurrentUserDataRequest();
  }, []);

  return (
    <UserManagmentContext.Provider
      value={{
        rows,
        columns,
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        userId,
        setUserId,
        handleChangePage,
        handleChangeRowsPerPage,
        handleUserIdChange,
        currentUserInfo,
        newName,
        newEmail,
        oldPassword,
        newPassword,
        handlenewEmailChange,
        handlenewNameChange,
        handleNewPasswordChange,
        handleOldPasswordChange,
        updateCurrentUserInfoRequest,
        updateCurrentUserPasswordRequest,
        modal,
        handleCloseModal,
        handleOpenModal,
        modalText,
        setModalText,
        modalText2,
        modal2,
        setModal2,
      }}
    >
      {children}
    </UserManagmentContext.Provider>
  );
};

const useGlobalUserManagment = () => {
  return useContext(UserManagmentContext);
};

export { UserManagmentContext, UserManagmentProvider, useGlobalUserManagment };
