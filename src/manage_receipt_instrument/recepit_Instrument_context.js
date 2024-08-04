import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import receipt_instrument_reducer from './recepit_instrument_reducer';

const Recepit_instrument_Context = createContext();

const Recepit_instrument_Provider = ({ children }) => {
  const columns = [
    { id: '_id', label: 'معرف الوصل', minWidth: 250 },
    { id: 'listNumber', label: 'رقم الوصل', minWidth: 250, align: 'right' },
    {
      id: 'receipt_instrument_updated_info_Date',
      label: 'تاريخ تعديل الوصل',
      minWidth: 250,
      align: 'right',
    },
    {
      id: 'receipt_instrument_Date',
      label: 'تاريخ عمل الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'vendor_receipt_instrument',
      label: 'الشركة المورده',
      minWidth: 250,
      align: 'right',
      format: (value) => {
        return new Intl.NumberFormat('en-US').format(value);
      },
    },

    {
      id: 'receipt_instrument_sum',
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
      id: 'moneyTransferWay',
      label: 'عملية تحويل الاموال',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },

    {
      id: 'moneyTransferCode',
      label: 'رمز عملية التحويل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },

    {
      id: 'moneyTransferDate',
      label: 'تاريخ عملية التحويل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },

    {
      id: 'receipt_instrument_Date_Entery',
      label: 'تاريخ ادخال الوصل',
      minWidth: 250,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialState = {
    recepit_instrument_data: [],
    unique_receipt_instrument_Date: [],
    unique_vendor_receipt_instrument: [],
    unique_moneyTransferWay: [],
    unique_moneyTransferDate: [],
  };

  const [state, dispatch] = useReducer(
    receipt_instrument_reducer,
    initialState
  );

  // MODAL States and functions
  const [modal2, setModal2] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleOpenModal2 = () => {
    setModal2(true);
  };
  const handleCloseModal2 = () => {
    setModal2(false);
  };

  // GET RECEPIT INSTRUMENT STATES

  const [listNumber, setListNumber] = useState(0);
  const [vendor_receipt_instrument, set_vendor_receipt_instrument] =
    useState('');
  const [receipt_instrument_Date, set_receipt_instrument_Date] = useState('');

  // CREATE RECEPIT INSTRUMENT STATES

  const [
    create_vendor_receipt_instrument,
    set_create_vendor_receipt_instrument,
  ] = useState('');
  const [create_receipt_instrument_sum, set_create_receipt_instrument_sum] =
    useState(0);
  const [create_receipt_instrument_date, set_create_receipt_instrument_date] =
    useState('');
  const [create_listNumber, set_create_listNumber] = useState(0);
  const [create_moneyTransferWay, set_create_moneyTransferWay] = useState('');
  const [create_moneyTransferDate, set_create_moneyTransferDate] = useState('');

  const create_recepit_instrument_body = {
    vendor_receipt_instrument: create_vendor_receipt_instrument,
    receipt_instrument_sum: create_receipt_instrument_sum,
    receipt_instrument_date: create_receipt_instrument_date,
    listNumber: create_listNumber,
    moneyTransferWay: create_moneyTransferWay,
    moneyTransferDate: create_moneyTransferDate,
  };

  // SINGLE RECEPIT INSTRUMENT INFORMATION

  const [single_recepit_instrument_data, set_single_recepit_instrument_data] =
    useState({});
  const [single_recepit_instrument_modal, set_single_recepit_instrument_modal] =
    useState(false);

  // UPDATE RECEPEIT INSTRUMNET STATES

  const [updateID, setUpdateID] = useState('');

  const update_recepit_instrument_body = {};

  const [
    update_vendor_receipt_instrument,
    set_update_vendor_receipt_instrument,
  ] = useState('');
  const [update_receipt_instrument_sum, set_update_receipt_instrument_sum] =
    useState(0);
  const [update_receipt_instrument_date, set_update_receipt_instrument_date] =
    useState('');
  const [update_listNumber, set_update_listNumber] = useState(0);
  const [update_moneyTransferWay, set_update_moneyTransferWay] = useState('');
  const [update_moneyTransferDate, set_update_moneyTransferDate] = useState('');

  if (update_vendor_receipt_instrument) {
    update_recepit_instrument_body.vendor_receipt_instrument =
      update_vendor_receipt_instrument;
  }

  if (update_receipt_instrument_sum) {
    update_recepit_instrument_body.receipt_instrument_sum =
      update_receipt_instrument_sum;
  }

  if (update_receipt_instrument_date) {
    update_recepit_instrument_body.receipt_instrument_date =
      update_receipt_instrument_date;
  }

  if (update_listNumber) {
    update_recepit_instrument_body.listNumber = update_listNumber;
  }

  if (update_moneyTransferWay) {
    update_recepit_instrument_body.moneyTransferWay = update_moneyTransferWay;
  }

  if (update_moneyTransferDate) {
    update_recepit_instrument_body.moneyTransferDate = update_moneyTransferDate;
  }

  // DELETE RECEPIT INSTRUMENT STATES

  const [deleteID, setDeleteID] = useState('');

  // handle function

  const handleListNumberChange = (e) => {
    setListNumber(e.target.value);
  };
  const handleDeleteIDChange = (e) => {
    setDeleteID(e.target.value);
  };

  const handle_create_listNumber_change = (e) => {
    set_create_listNumber(e.target.value);
  };

  const handle_create_receipt_instrument_sum = (e) => {
    set_create_receipt_instrument_sum(e.target.value);
  };

  const handle_update_listNumber_change = (e) => {
    set_update_listNumber(e.target.value);
  };

  const handle_update_receipt_instrument_sum = (e) => {
    set_update_receipt_instrument_sum(e.target.value);
  };

  const handleUpdateId = (e) => {
    setUpdateID(e.target.value);
  };

  const handle_single_recepit_instrument_close_modal = () => {
    set_single_recepit_instrument_modal(false);
  };

  const handle_single_recepit_instrument_open_modal = () => {
    set_single_recepit_instrument_modal(true);
  };

  // GET RECEPIT INSTRUMENT REQUEST

  const getRecepitInstrumentRequest = async () => {
    const getRecepitInstrumentRequestURL = `http://localhost:5000/shop/v1/api/Receipt_instrument?listNumber=${
      listNumber === 0 ? '' : listNumber
    }&receipt_instrument_Date=${
      receipt_instrument_Date === undefined ? '' : receipt_instrument_Date
    }&vendor_receipt_instrument=${
      vendor_receipt_instrument === undefined ? '' : vendor_receipt_instrument
    }`;

    try {
      const response = await fetch(getRecepitInstrumentRequestURL, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: 'GET_RECEPIT_INSTRUMENT_DATA', payload: data });
        dispatch({ type: 'GET_UNIQUE_RECEPIT_INSTRUMENT_DATE', payload: data });
        dispatch({
          type: 'GET_UNIQUE_VENDOR_RECEPIT_INSTRUMENT',
          payload: data,
        });
        dispatch({
          type: 'GET_UNIQUE_MONEY_TRANSFER_WAY',
          payload: data,
        });

        dispatch({
          type: 'GET_UNIQUE_MONEY_TRANSFER_DATE',
          payload: data,
        });
      } else {
        console.error(response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // CREATE RECEPIT INSTRUMENT REQUEST

  const createRecepitInstrumentRequest = async () => {
    const createRecepitInstrumentRequestURL = `http://localhost:5000/shop/v1/api/Receipt_instrument`;

    try {
      const response = await fetch(createRecepitInstrumentRequestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(create_recepit_instrument_body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setModalText(`Recepit Instrumnet has been created successfully`);
        setModal2(true);
      } else {
        console.error(response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE RECEPIT INSTRUMENT REQUEST

  const updateRecepitInstrumentRequest = async () => {
    const updateRecepitInstrumentRequestURL = `http://localhost:5000/shop/v1/api/Receipt_instrument/${updateID}`;

    try {
      const response = await fetch(updateRecepitInstrumentRequestURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(update_recepit_instrument_body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setModalText(`Recpit instrumnet has been updated successfully`);
        setModal2(true);
      } else {
        console.error(response.statusText);
        setModalText(`Error: ${response.statusText}${response.status}`);
        setModal2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE RECEPIT INSTRUMENT REQUEST

  const deleteRecepitInstrumentRequest = async () => {
    const deleteRecepitInstrumentRequestURL = `http://localhost:5000/shop/v1/api/Receipt_instrument/${deleteID}`;

    try {
      const response = await fetch(deleteRecepitInstrumentRequestURL, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET SINGLE RECEIPT INFOMRATION THAT YOU WANT TO UPDATE
  const getRecepitInformationToUpdate = async () => {
    const getSingleRecepitInfomrationRequest = `http://localhost:5000/shop/v1/api/Receipt_instrument/${updateID}`;

    try {
      const response = await fetch(getSingleRecepitInfomrationRequest, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const {
          listNumber,
          receipt_instrument_Date,
          vendor_receipt_instrument,
          receipt_instrument_sum,
          moneyTransferWay,
          moneyTransferDate,
        } = responseData.receipt_instrument;
        set_update_listNumber(listNumber);
        set_update_moneyTransferDate(moneyTransferDate);
        set_update_receipt_instrument_sum(receipt_instrument_sum);
        set_update_vendor_receipt_instrument(vendor_receipt_instrument);
        set_update_receipt_instrument_date(receipt_instrument_Date);
        set_update_moneyTransferWay(moneyTransferWay);
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
    getRecepitInstrumentRequest();
  }, [listNumber, receipt_instrument_Date, vendor_receipt_instrument]);

  return (
    <Recepit_instrument_Context.Provider
      value={{
        ...state,
        listNumber,
        setListNumber,
        vendor_receipt_instrument,
        set_vendor_receipt_instrument,
        receipt_instrument_Date,
        set_receipt_instrument_Date,
        handleListNumberChange,
        columns,
        deleteID,
        handleDeleteIDChange,
        deleteRecepitInstrumentRequest,
        create_vendor_receipt_instrument,
        set_create_vendor_receipt_instrument,
        create_receipt_instrument_sum,
        set_create_receipt_instrument_sum,
        create_receipt_instrument_date,
        set_create_receipt_instrument_date,
        create_listNumber,
        set_create_listNumber,
        create_moneyTransferWay,
        set_create_moneyTransferWay,
        create_moneyTransferDate,
        set_create_moneyTransferDate,
        handle_create_listNumber_change,
        handle_create_receipt_instrument_sum,
        createRecepitInstrumentRequest,

        update_vendor_receipt_instrument,
        set_update_vendor_receipt_instrument,
        update_receipt_instrument_sum,
        set_update_receipt_instrument_sum,
        update_receipt_instrument_date,
        set_update_receipt_instrument_date,
        update_listNumber,
        set_update_listNumber,
        update_moneyTransferWay,
        set_update_moneyTransferWay,
        update_moneyTransferDate,
        set_update_moneyTransferDate,
        handle_update_listNumber_change,
        handle_update_receipt_instrument_sum,
        updateRecepitInstrumentRequest,
        updateID,
        setUpdateID,
        handleUpdateId,
        modal2,
        handleCloseModal2,
        handleOpenModal2,
        setModal2,
        modalText,
        getRecepitInformationToUpdate,
        single_recepit_instrument_data,
        single_recepit_instrument_modal,
        set_single_recepit_instrument_data,
        set_single_recepit_instrument_modal,
        handle_single_recepit_instrument_close_modal,
        handle_single_recepit_instrument_open_modal,
      }}
    >
      {children}
    </Recepit_instrument_Context.Provider>
  );
};

const useGlobalRecepitInstrument = () => {
  return useContext(Recepit_instrument_Context);
};

export {
  Recepit_instrument_Context,
  Recepit_instrument_Provider,
  useGlobalRecepitInstrument,
};
