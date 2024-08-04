const receipt_instrument_reducer = (state, action) => {
  if (action.type === 'GET_RECEPIT_INSTRUMENT_DATA') {
    return {
      ...state,
      recepit_instrument_data: action.payload.receipt_instrument,
    };
  }

  if (action.type === 'GET_UNIQUE_RECEPIT_INSTRUMENT_DATE') {
    const dataUnique = [
      ...new Set(
        action.payload.receipt_instrument.map(
          (item) => item.receipt_instrument_Date
        )
      ),
    ];

    return { ...state, unique_receipt_instrument_Date: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_VENDOR_RECEPIT_INSTRUMENT') {
    const dataUnique = [
      ...new Set(
        action.payload.receipt_instrument.map(
          (item) => item.vendor_receipt_instrument
        )
      ),
    ];

    return { ...state, unique_vendor_receipt_instrument: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_MONEY_TRANSFER_WAY') {
    const dataUnique = [
      ...new Set(
        action.payload.receipt_instrument.map((item) => item.moneyTransferWay)
      ),
    ];

    return { ...state, unique_moneyTransferWay: dataUnique };
  }

  if (action.type === 'GET_UNIQUE_MONEY_TRANSFER_DATE') {
    const dataUnique = [
      ...new Set(
        action.payload.receipt_instrument.map((item) => item.moneyTransferDate)
      ),
    ];

    return { ...state, unique_moneyTransferDate: dataUnique };
  }
  throw Error('No match to action types ');
};

export default receipt_instrument_reducer;
