const orderReducer = (state, action) => {
  if (action.type === 'GER_ORDERS') {
    return { ...state, orders: action.payload };
  }

  if (action.type === 'GET_SINGLE_ORDER_PRODUCTS') {
    return { ...state, singleOrderProducts: action.payload };
  }

  if (action.type === 'GET_TRANSACTION_INFORMATION') {
    return { ...state, transactionInfo: action.payload };
  }

  if (action.type === 'GET_ANALIZED_DATA') {
    return { ...state, analizedData: action.payload };
  }

  if (action.type === 'GET_UNIQUE_YEARS') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.orderYear)),
    ];

    return { ...state, uniqueYear: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_MONTH') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.orderMonth)),
    ];

    return { ...state, uniqueMonth: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_DAYS') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.orderDay)),
    ];

    return { ...state, uniqueDays: dataUnique };
  }

  if (action.type === 'GET_PRODUCT_NAMES') {
    const data = action.payload.orders.map((item) => {
      return item.productName;
    });
    return { ...state, productNames: data };
  }

  if (action.type === 'GET_PRODUCT_QUANTITY_AND_NAMES') {
    const data = action.payload.orders.map((item) => {
      return { x: item.productName, y: item.totalQuantity };
    });
    return { ...state, productQuantityAndNames: data };
  }

  if (action.type === 'GET_PRODUCT_PRICES') {
    const data = action.payload.orders.map((item) => {
      return item.totalRvenuePerItem;
    });
    return { ...state, prudctPrices: data };
  }

  if (action.type === 'GET_TOTAL_REVENUE') {
    const data = action.payload.totalRevenue[0].totalRevenue;
    return { ...state, totalRevenue: data };
  }

  throw new Error('no matching action type');
};

export default orderReducer;
