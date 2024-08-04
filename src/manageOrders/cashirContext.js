import React from 'react';
import { useContext, useState, useEffect, useReducer } from 'react';
import cashirReducer from './cashirReducer';

const databaseProductURL = 'http://localhost:5000/shop/v1/api/products';
const cashirOrderURL =
  'http://localhost:5000/shop/v1/api/order/createOrderFromCashir';

const CashirContext = React.createContext();

const CashirContextProvider = ({ children }) => {
  const initialState = {
    databaseProducts: [],
    tempBarcodeProduct: {},
    cashirCart: [],
    chashirTotal: 0,
    modalSate: false,
  };

  //const [databaseProducts, setDatabaseProducts] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [flag, setFlag] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [state, dispatch] = useReducer(cashirReducer, initialState);

  // FUNCTIONS

  const findBarCodeItem = () => {
    dispatch({ type: 'FIND_BARCODE_PRODUCT', payload: barcode });
  };

  const addCashirCartItem = () => {
    dispatch({ type: 'ADD_ITEM' });
  };

  const increaseCashirCartItem = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decreaseCashirCartItem = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const removeCashirCartItem = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const handleOpenModal3 = () => {
    setModal3(true);
  };
  const handleCloseModal3 = () => {
    setModal3(false);
  };

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  // Back-end requests
  const getAllDatabaseProductsRequest = async () => {
    try {
      const response = await fetch(databaseProductURL);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'GETDATA_BASE_PRODUCTS', payload: data });
      } else {
        console.log(
          'base case happen while fetching whole products for cashir'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestBody = {
    items: [...state.cashirCart],
  };

  const postCashirOrder = async () => {
    try {
      const response = await fetch(cashirOrderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setModalText('تمت عملية الشراء بنجاح');
      } else {
        console.log(
          'base case happen while fetching whole products for cashir'
        );
        setModalText('هناك خلل في عملية الشراء حاول مرة اخرئ');
      }
    } catch (error) {
      console.log(error);
      setModalText('هناك خلل في عملية الشراء حاول مرة اخرئ');
    }
  };

  useEffect(() => {
    getAllDatabaseProductsRequest();
  }, []);

  useEffect(() => {
    findBarCodeItem();
    addCashirCartItem();
  }, [barcode]);

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cashirCart]);

  return (
    <CashirContext.Provider
      value={{
        ...state,
        findBarCodeItem,
        addCashirCartItem,
        increaseCashirCartItem,
        decreaseCashirCartItem,
        removeCashirCartItem,
        barcode,
        setBarcode,
        handleOpenModal3,
        handleCloseModal3,
        modal3,
        handleCloseModal,
        handleOpenModal,
        modal,
        postCashirOrder,
        modalText,
      }}
    >
      {children}
    </CashirContext.Provider>
  );
};

const useGlobalCashirContext = () => {
  return useContext(CashirContext);
};

export { useGlobalCashirContext, CashirContextProvider, CashirContext };
