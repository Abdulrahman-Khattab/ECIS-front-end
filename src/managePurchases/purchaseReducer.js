const purchaseReducer = (state, action) => {
  if (action.type === 'GET_PURCHASE') {
    return { ...state, purchaseData: action.payload.purchaseRecords };
  }

  if (action.type === 'GET_UNIQUE_VENDOR') {
    const dataUnique = [
      ...new Set(action.payload.purchaseRecords.map((item) => item.vendor)),
    ];

    return { ...state, uniqueVendor: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_PURCHASEDATE') {
    const dataUnique = [
      ...new Set(
        action.payload.purchaseRecords.map((item) => item.purchaseDate)
      ),
    ];

    return { ...state, uniqueDate: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_LISTNUMBER') {
    const dataUnique = [
      ...new Set(action.payload.purchaseRecords.map((item) => item.listDate)),
    ];

    return { ...state, uniqueListNumber: dataUnique };
  }

  throw new Error('no matching action type');
};

export default purchaseReducer;
