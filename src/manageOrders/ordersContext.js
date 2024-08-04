import React, { createContext } from 'react';
import { useState, useContext, useEffect, useReducer } from 'react';
import orderReducer from './orderReducer';

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  // ORDER PAGE COLUMNS
  const columns = [
    { id: '_id', label: 'معرف الطلب', minWidth: 250 },
    { id: 'user', label: 'معرف المشتري', minWidth: 250, align: 'right' },
    {
      id: 'status',
      label: 'حالة الطلب',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'orderYear',
      label: 'سنة الطلب',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'orderMonth',
      label: 'شهر الطلب',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'orderDay',
      label: 'يوم الطلب',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'paymentIntentId',
      label: 'معرف عملية الدفع ',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'orderDate',
      label: 'معلومات الطلب',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US').format(value);
      },
    },

    {
      id: 'total',
      label: 'مبلغ الطلب الكلي',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    },
    /*{
      id: 'orderd Items ',
      label: 'ordered items list ',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    }, */
  ];

  // TRANSACTION PAGE COLUMNSS

  const transactionInformationColumns = [
    { id: 'name', label: 'اسم التاجر', minWidth: 250 },
    {
      id: 'msisdn',
      label: 'رقم هاتف التاجر',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'currency',
      label: 'العملة',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'source',
      label: 'مصدر الدفع',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'type',
      label: 'نوع الدفع ',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'amount',
      label: 'مبلغ الدفع',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'serviceType',
      label: 'نوع الخدمة ',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'lang',
      label: 'اللغة',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'orderId',
      label: 'معرف الطلب',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'status',
      label: 'حالة الطلب',
      minWidth: 250,
      align: 'right',
    },

    {
      id: 'traveldiscount',
      label: 'مبلغ الطلب بادينار العراقي',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'from',
      label: 'رقم المشتري ',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'totalFees',
      label: 'ضريبة المشتري',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'due',
      label: 'معلومات الطلب',
      minWidth: 250,
      align: 'right',
    },
  ];

  // ORDER PRODUCT COLUMNS

  const orderProductsColumns = [
    { id: '_id', label: 'معرف الطلب', minWidth: 250 },
    { id: 'product', label: 'معرف المنتج', minWidth: 250, align: 'right' },
    {
      id: 'amount',
      label: 'عدد القطع',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'name',
      label: 'اسم المنتج ',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'price',
      label: 'سعر المنتج',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US').format(value);
      },
    },
  ];

  const initialState = {
    orders: [],
    singleOrderProducts: [],
    transactionInfo: {},
    analizedData: {},
    uniqueDays: [],
    uniqueMonth: [],
    uniqueYear: [],
    productNames: [],
    productQuantityAndNames: [],
    prudctPrices: [],
    totalRevenue: [],
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  // TRANSACTION INFORMATION STATE AND INFO ID :

  const [transactionID, setTransactionID] = useState('');
  const handleTransactionID = (e) => {
    setTransactionID(e.target.value);
  };

  // ANALIZED DATA STATES
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // CURRENT USER ORDER STATES

  const [currentUserOrder, setCurrentUserOrder] = useState([]);

  // CASHIR STATES

  // GET ALL ORDERS REQUEST
  const getAllOrdersRequest = async () => {
    const getAllOrdersURL = 'http://localhost:5000/shop/v1/api/order';

    try {
      const response = await fetch(getAllOrdersURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'GER_ORDERS', payload: data.orders });
        dispatch({ type: 'GET_UNIQUE_YEARS', payload: data.orders });
        dispatch({ type: 'GET_UNIQUE_MONTH', payload: data.orders });
        dispatch({ type: 'GET_UNIQUE_DAYS', payload: data.orders });
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET SINGLE ORDER PRODUCTS

  const getSingleOrdersRequest = async (id) => {
    const getAllOrdersURL = `http://localhost:5000/shop/v1/api/order/${id}`;

    try {
      const response = await fetch(getAllOrdersURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: 'GET_SINGLE_ORDER_PRODUCTS',
          payload: data.order.orderItems,
        });
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TRANSACTION INFORMATION REQUEST

  const getTransactionInformationRequest = async (id) => {
    const getTransactionInformationsURL = `http://localhost:5000/shop/v1/api/order/checkTransactionInfo/${transactionID}`;

    try {
      const response = await fetch(getTransactionInformationsURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const flattenedData = {
          ...data,
          ...data.to,
          to: undefined, // Optional: Set to undefined to remove the original "to" property
        };

        console.log(flattenedData);
        dispatch({
          type: 'GET_TRANSACTION_INFORMATION',
          payload: flattenedData,
        });
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET ANALIZED DATA REQUEST
  const getAnalizedDataRequest = async () => {
    const getAnalizedDataURL = `http://localhost:5000/shop/v1/api/order/getOrders?orderYear=${
      year === undefined ? '' : year === 'all' ? '' : year
    }&orderMonth=${month ? (month === 'all' ? '' : month) : ''}&orderDay=${
      day ? (day === 'all' ? '' : day) : ''
    }`;

    try {
      const response = await fetch(getAnalizedDataURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'GET_ANALIZED_DATA', payload: data });
        dispatch({ type: 'GET_PRODUCT_NAMES', payload: data });
        dispatch({
          type: 'GET_PRODUCT_QUANTITY_AND_NAMES',
          payload: data,
        });
        dispatch({
          type: 'GET_PRODUCT_PRICES',
          payload: data,
        });

        dispatch({
          type: 'GET_TOTAL_REVENUE',
          payload: data,
        });
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET CURRENT USER ORDERS

  const getCurrentUserOrderRequest = async () => {
    const getCurrentUserOrderURL = `http://localhost:5000/shop/v1/api/order/getCurrentUserOrder`;

    try {
      const response = await fetch(getCurrentUserOrderURL, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUserOrder(data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrdersRequest();
  }, []);

  useEffect(() => {
    getAnalizedDataRequest();
  }, [year, month, day]);
  useEffect(() => {
    getCurrentUserOrderRequest();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        columns,
        orderProductsColumns,
        transactionInformationColumns,
        getSingleOrdersRequest,
        transactionID,
        setTransactionID,
        handleTransactionID,
        getTransactionInformationRequest,
        year,
        setYear,
        month,
        setMonth,
        day,
        setDay,
        currentUserOrder,
        setCurrentUserOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useGlobalOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderContext, OrderContextProvider, useGlobalOrderContext };
