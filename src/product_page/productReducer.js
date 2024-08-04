const productReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'GETDATA') {
    return { ...state, data: action.payload, loading: false };
  }

  if (action.type === 'STOPLOADING') {
    return { ...state, loading: false };
  }

  if (action.type === 'GET_UNIQUE_CATEGORY') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.category)),
    ];

    return { ...state, uniqueCategory: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_DEPARTMENT') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.department)),
    ];

    return { ...state, uniqueDepartment: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_COMPANY') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.company)),
    ];

    return { ...state, uniqueCompany: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_COLORS') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.color)),
    ];

    return { ...state, uniqueColors: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_NAME') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.name)),
    ];

    return { ...state, uniqueNames: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_SELLPRICES') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.sellPrice)),
    ];

    return { ...state, uniqueSellPrices: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_ORIGINALPRICES') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.originalPrice)),
    ];

    return { ...state, uniqueOriginalPrice: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_INVENTORY') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.inventory)),
    ];

    return { ...state, uniqueinventory: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_AVERAGERAING') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.averageRating)),
    ];

    return { ...state, uniqueaverageRating: dataUnique, loading: false };
  }

  if (action.type === 'GET_UNIQUE_NUMBER_OF_REVIEWS') {
    const dataUnique = [
      'all',
      ...new Set(action.payload.map((item) => item.numOfReviews)),
    ];

    return { ...state, uniqueNumOfReviews: dataUnique, loading: false };
  }

  if (action.type === 'DATA_FILTER') {
    return { ...state, data: action.payload };
  }

  throw new Error('no matching action type');
};

export default productReducer;
