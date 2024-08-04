import react, { useReducer } from 'react';
import { useState, useEffect, useContext } from 'react';
import CartReducer from './cart_reducer';
import { useGlobalPrdouctContext } from '../product_page/productContext';
import NA from '../static_resource/NA.png';

const CartContext = react.createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    cart: [],
    cartTotal: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [openCart, setOpenCart] = useState(false);

  // MODAL STATES

  const [modal, setModal] = useState(false);

  // CREATE PAYMENT States
  const [paymentURL, setPaymentURL] = useState('');

  // Create ORDER BODY
  const createOrderrequestBody = { items: state.cart };

  // handler functions

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };
  const handleCloseCart = () => {
    setOpenCart(false);
  };

  // CART FUNCTIONS
  const addToCart = (item) => {
    console.log(item);
    setOpenCart(true);
    const { _id, company, name, image, sellPrice, inventory } = item;
    const cartItem = {
      id: _id,
      company,
      name,
      image: image === '/uploads/example.jpeg' ? NA : image,
      sellPrice,
      amount: 0,
      subTotal: 0,
      inventory,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const increaseCartItem = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decreaseCartItem = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const removeCartItem = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  // CREATE ORDER REQUEST
  const createOrderRequest = async () => {
    const createOrderURL = 'http://localhost:5000/shop/v1/api/order';
    try {
      const response = await fetch(createOrderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(createOrderrequestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { paymetIntentURL } = data;
        setPaymentURL(paymetIntentURL);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleCloseCart,
        handleOpenCart,
        openCart,
        setOpenCart,
        addToCart,
        increaseCartItem,
        decreaseCartItem,
        removeCartItem,
        handleCloseModal,
        handleOpenModal,
        modal,
        setModal,
        createOrderRequest,
        paymentURL,
        setPaymentURL,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useGlobalCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider };
