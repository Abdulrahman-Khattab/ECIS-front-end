import React, { createContext } from 'react';
import { useState, useEffect, useContext, useReducer } from 'react';
import purchaseReducer from './purchaseReducer';

const PurchaseContext = createContext();

const PurchaseProvider = ({ children }) => {
  const columns = [
    { id: '_id', label: 'معرف وصل الشراء', minWidth: 250 },
    { id: 'listNumber', label: 'رقم الوصل', minWidth: 250, align: 'right' },
    {
      id: 'purchaseDate',
      label: 'تاريخ عمل وصل الشراء',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'vendor',
      label: 'الشركه المورده',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'purchaseUpdatedInfoDate',
      label: 'تاريخ تعديل الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US').format(value);
      },
    },

    {
      id: 'purchaseSum',
      label: 'مبلغ الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    },
    {
      id: 'adminstrator',
      label: 'معرف الذي ادخل الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'purchaseDateEntery',
      label: 'تاريخ ادخال الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialState = {
    purchaseData: [],
    uniqueVendor: [],
    uniqueListNumber: [],
    uniqueDate: [],
  };

  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  // MODAL States and functions
  const [modal2, setModal2] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleOpenModal2 = () => {
    setModal2(true);
  };
  const handleCloseModal2 = () => {
    setModal2(false);
  };

  // GET ALL PURCHASES STATES

  const [vendor, setVendor] = useState('');
  const [listNumber, setListNumber] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState('');

  // Delete pruchas states

  const [deleteID, setDeleteID] = useState('');

  // Create purchases states

  const [createListNumber, setCreateListNumber] = useState(0);
  const [createPurchaseSum, setCreatePurchaseSum] = useState(0);
  const [createVendor, setCreateVendor] = useState('');
  const [createPuchaseDate, setCreatePurchaseDate] = useState('');

  const createPurchaseRequestBody = {
    listNumber: createListNumber,
    purchaseDate: createPuchaseDate,
    vendor: createVendor,
    purchaseSum: createPurchaseSum,
  };

  // update purchases states

  const [updateListNumber, setUpdateListNumber] = useState(0);
  const [updatePurchaseSum, setUpdatePurchaseSum] = useState(0);
  const [updateVendor, setUpdateVendor] = useState('');
  const [updatePuchaseDate, setUpdatePurchaseDate] = useState('');
  const [updateID, setUpdateID] = useState('');

  const updatePurchaseRequestBody = {
    listNumber: updateListNumber,
    purchaseDate: updatePuchaseDate,
    vendor: updateVendor,
    purchaseSum: updatePurchaseSum,
  };

  // singePurchase states

  const [singlePurchaseModal, setSinglePurchaseModal] = useState(false);
  const [singlePurchaseData, setSinglePurchaseData] = useState({});

  //handles functions

  const handleDeleteID = (e) => {
    setDeleteID(e.target.value);
  };

  const handleCreateListNumber = (e) => {
    setCreateListNumber(e.target.value);
  };

  const handleCreatePurchaseSum = (e) => {
    setCreatePurchaseSum(e.target.value);
  };

  const handleUpdateListNumber = (e) => {
    setUpdateListNumber(e.target.value);
  };

  const handleUpdatePurchaseSum = (e) => {
    setUpdatePurchaseSum(e.target.value);
  };

  const handleUpdateID = (e) => {
    setUpdateID(e.target.value);
  };

  const handleCloseSinglePurchaseModal = () => {
    setSinglePurchaseModal(false);
  };
  const handleOpenSinglePurchaseModal = () => {
    setSinglePurchaseModal(true);
  };

  // GET ALL PURCHASES

  const getAllPurchasesRequest = async () => {
    const getAllPurchaseURL = `http://localhost:5000/shop/v1/api/purchases?purchaseDate=${
      purchaseDate === undefined ? '' : purchaseDate
    }&vendor=${vendor === undefined ? '' : vendor}&listNumber=${
      listNumber === 0 ? '' : listNumber
    }`;
    console.log(getAllPurchaseURL);
    try {
      const response = await fetch(getAllPurchaseURL, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.purchaseRecords);
        dispatch({ type: 'GET_PURCHASE', payload: data });
        dispatch({ type: 'GET_UNIQUE_VENDOR', payload: data });
        dispatch({ type: 'GET_UNIQUE_PURCHASEDATE', payload: data });
        dispatch({ type: 'GET_UNIQUE_LISTNUMBER', payload: data });
      } else {
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Purchase

  const deletPurchaseRequest = async () => {
    const deletePurchaseURL = `http://localhost:5000/shop/v1/api/purchases/${deleteID}`;

    try {
      const response = await fetch(deletePurchaseURL, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // CREATE PURCHASE REQUEST

  const createPurchaseRequest = async () => {
    const createPurchaseURL = 'http://localhost:5000/shop/v1/api/purchases';

    try {
      const response = await fetch(createPurchaseURL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(createPurchaseRequestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setModalText(`purchase has been created successfully`);
        setModal2(true);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update product request

  const updatePurchaseRequest = async () => {
    const updatePurchaseURL = `http://localhost:5000/shop/v1/api/purchases/${updateID}`;

    const requstBody = {};

    if (updateVendor) {
      requstBody.vendor = updateVendor;
    }

    if (updateListNumber) {
      requstBody.listNumber = updateListNumber;
    }

    if (updatePuchaseDate) {
      requstBody.purchaseDate = updatePuchaseDate;
    }

    if (updatePurchaseSum) {
      requstBody.purchaseSum = updatePurchaseSum;
    }
    try {
      const response = await fetch(updatePurchaseURL, {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requstBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setModalText(`updated has been done successfully`);
        setModal2(true);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // GET INFORMATION THAT YOU WANT TO UPDATE FOR PURCHASE

  const getPurchaseInformationToUpdate = async () => {
    const getSinglePurchaseInfomrationRequest = `http://localhost:5000/shop/v1/api/purchases/${updateID}`;

    try {
      const response = await fetch(getSinglePurchaseInfomrationRequest, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const { listNumber, purchaseDate, vendor, purchaseSum } =
          responseData.purchaseRecord;
        setUpdateListNumber(listNumber);
        setUpdatePurchaseDate(purchaseDate);
        setUpdatePurchaseSum(purchaseSum);
        setUpdateVendor(vendor);
      } else {
        console.error('Error:', response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllPurchasesRequest();
  }, [listNumber, vendor, purchaseDate]);

  return (
    <PurchaseContext.Provider
      value={{
        ...state,

        vendor,
        listNumber,
        purchaseDate,
        setVendor,
        setListNumber,
        setPurchaseDate,
        columns,
        handleDeleteID,
        deleteID,
        deletPurchaseRequest,
        createPurchaseSum,
        createListNumber,
        setCreateListNumber,
        setCreatePurchaseSum,
        handleCreateListNumber,
        handleCreatePurchaseSum,
        createPuchaseDate,
        setCreatePurchaseDate,
        createVendor,
        setCreateVendor,
        createPurchaseRequest,
        updatePurchaseSum,
        updateListNumber,
        setUpdateListNumber,
        setUpdatePurchaseSum,
        handleUpdateListNumber,
        handleUpdatePurchaseSum,
        updatePuchaseDate,
        setUpdatePurchaseDate,
        updateVendor,
        setUpdateVendor,
        handleUpdateID,
        updateID,
        updatePurchaseRequest,
        modal2,
        handleCloseModal2,
        handleOpenModal2,
        setModal2,
        modalText,
        getPurchaseInformationToUpdate,
        setUpdateID,
        singlePurchaseData,
        setSinglePurchaseData,
        singlePurchaseModal,
        setSinglePurchaseModal,
        handleCloseSinglePurchaseModal,
        handleOpenSinglePurchaseModal,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

const useGlobalPurchaseContext = () => {
  return useContext(PurchaseContext);
};

export { PurchaseContext, PurchaseProvider, useGlobalPurchaseContext };
