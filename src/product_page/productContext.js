import React from 'react';
import { useState, useContext, useEffect, useReducer } from 'react';
import productReducer from './productReducer';
const url = 'http://localhost:5000/shop/v1/api/products';

const productContext = React.createContext();

const ProductProvider = ({ children }) => {
  const fetchProducts = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'GETDATA', payload: data });
      dispatch({ type: 'GET_UNIQUE_CATEGORY', payload: data });
      dispatch({ type: 'GET_UNIQUE_DEPARTMENT', payload: data });
      dispatch({ type: 'GET_UNIQUE_COMPANY', payload: data });
      dispatch({ type: 'GET_UNIQUE_COLORS', payload: data });
      dispatch({ type: 'GET_UNIQUE_NAME', payload: data });
      dispatch({ type: 'GET_UNIQUE_SELLPRICES', payload: data });
      dispatch({ type: 'GET_UNIQUE_ORIGINALPRICES', payload: data });
      dispatch({ type: 'GET_UNIQUE_INVENTORY', payload: data });
      dispatch({ type: 'GET_UNIQUE_AVERAGERAING', payload: data });
      dispatch({ type: 'GET_UNIQUE_NUMBER_OF_REVIEWS', payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'STOPLOADING' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const initialState = {
    data: [],
    loading: true,
    uniqueCategory: [],
    uniqueDepartment: [],
    uniqueCompany: [],
    uniqueColors: [],
    uniqueNames: [],
    uniqueSellPrices: [],
    uniqueOriginalPrice: [],
    uniqueinventory: [],
    uniqueaverageRating: [],
    uniqueNumOfReviews: [],
  };

  const [state, dispatch] = useReducer(productReducer, initialState);
  const [color, setColor] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');

  const [price, setPrice] = useState(200000);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    console.log(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlecategoryClick = (e) => {
    setCategory(e.target.textContent);
  };

  const clearFilter = () => {
    setPrice(200000);
    setName('');
    setCompany('');
    setColor('');
    setDepartment('');
    setCategory('');
  };

  let filterUrl = `http://localhost:5000/shop/v1/api/products?name=${
    name ? name : ''
  }&color=${color ? (color === 'all' ? '' : color) : ''}&company=${
    company ? (company === 'all' ? '' : company) : ''
  }&numericFilters=sellPrice<=${price}&category=${
    category ? (category === 'all' ? '' : category) : ''
  }&department=${department ? (department === 'all' ? '' : department) : ''} `;

  const dataFilter = async () => {
    try {
      const response = await fetch(filterUrl);
      const filterdData = await response.json();
      dispatch({ type: 'DATA_FILTER', payload: filterdData });
    } catch (error) {
      dispatch({ type: 'STOPLOADING' });
      console.log(error);
    }
  };

  useEffect(() => {
    dataFilter();
  }, [name, company, color, price, category, department]);

  return (
    <productContext.Provider
      value={{
        ...state,
        company,
        setCompany,
        color,
        setColor,
        name,
        setName,
        price,
        setPrice,
        category,
        department,
        setCategory,
        handleNameChange,
        handleColorChange,
        handleCompanyChange,
        handlePriceChange,
        handlecategoryClick,
        clearFilter,
        handleDepartmentChange,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const useGlobalPrdouctContext = () => {
  return useContext(productContext);
};

export { productContext, ProductProvider };
