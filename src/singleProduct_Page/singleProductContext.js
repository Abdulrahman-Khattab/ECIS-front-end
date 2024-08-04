import React from 'react';
import { useEffect, useState, useContext } from 'react';

const SingleProductCotext = React.createContext();

const SingleProductProvider = ({ children }) => {
  const [singlePrdouctData, setSinglePrdouctData] = useState([]);
  const [id, setId] = useState('');
  const singleProductURL = `http://localhost:5000/shop/v1/api/products/${id}`;

  const fetchSingleProduct = async () => {
    try {
      const response = await fetch(singleProductURL);
      const data = await response.json();
      setSinglePrdouctData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [amount, setAmount] = useState(0);

  const increaseAmount = () => {
    setAmount((oldAmount) => {
      let newAmount = oldAmount + 1;
      return newAmount;
    });
  };

  const decreaseAmount = () => {
    setAmount((oldAmount) => {
      if (oldAmount == 0) {
        return 0;
      } else {
        let newAmount = oldAmount - 1;
        return newAmount;
      }
    });
  };

  const idTaker = (idValue) => {
    setId(idValue);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  return (
    <SingleProductCotext.Provider
      value={{
        increaseAmount,
        decreaseAmount,
        amount,
        idTaker,
        ...singlePrdouctData,
        singlePrdouctData,
      }}
    >
      {children}
    </SingleProductCotext.Provider>
  );
};

const useGlobalSingleProductContext = () => {
  return useContext(SingleProductCotext);
};

export {
  useGlobalSingleProductContext,
  SingleProductCotext,
  SingleProductProvider,
};
