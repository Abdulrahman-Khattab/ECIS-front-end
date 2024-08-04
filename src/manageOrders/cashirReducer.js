const cashirReducer = (state, action) => {
  if (action.type == 'GETDATA_BASE_PRODUCTS') {
    return { ...state, databaseProducts: action.payload };
  }

  if (action.type === 'INTITLIZE_CASHIR_CART') {
    return { ...state, cashirCart: [] };
  }

  if (action.type === 'FIND_BARCODE_PRODUCT') {
    const product = state.databaseProducts.find(
      (productItem) => action.payload === productItem.barcode
    );

    return {
      ...state,
      tempBarcodeProduct: { ...product, amount: 0, subTotal: 0 },
    };
  }

  if (action.type == 'ADD_ITEM') {
    const exitCashirItem = state.cashirCart.find(
      (cashirItem) => cashirItem.barcode === state.tempBarcodeProduct.barcode
    );

    if (exitCashirItem) {
      let tempCashirCart = state.cashirCart.map((cashirItem) => {
        if (cashirItem.barcode === state.tempBarcodeProduct.barcode) {
          if (cashirItem.amount < cashirItem.inventory) {
            return {
              ...cashirItem,
              amount: cashirItem.amount + 1,
              subTotal: (cashirItem.amount + 1) * cashirItem.sellPrice,
            };
          }
        }
        return cashirItem;
      });
      return { ...state, cashirCart: tempCashirCart };
    } else {
      return {
        ...state,
        cashirCart: [
          ...state.cashirCart,
          {
            ...state.tempBarcodeProduct,
            amount: 1,
            subTotal: state.tempBarcodeProduct.sellPrice,
          },
        ],
      };
    }
  }

  if (action.type === 'INCREASE') {
    const tempCashirCart = state.cashirCart.map((cashirCartItem) => {
      if (cashirCartItem._id === action.payload) {
        if (cashirCartItem.amount < cashirCartItem.inventory) {
          return {
            ...cashirCartItem,
            amount: cashirCartItem.amount + 1,
            subTotal: (cashirCartItem.amount + 1) * cashirCartItem.sellPrice,
          };
        } else {
          return cashirCartItem;
        }
      }
      return cashirCartItem;
    });

    return { ...state, cashirCart: tempCashirCart };
  }

  if (action.type === 'DECREASE') {
    const tempCashirCart = state.cashirCart
      .map((cashirCartItem) => {
        if (cashirCartItem._id === action.payload) {
          if (cashirCartItem.amount === 1) {
            return null;
          } else {
            return {
              ...cashirCartItem,
              amount: cashirCartItem.amount - 1,
              subTotal: (cashirCartItem.amount - 1) * cashirCartItem.sellPrice,
            };
          }
        }
        return cashirCartItem;
      })
      .filter((cashirCartItem) => cashirCartItem !== null);

    return { ...state, cashirCart: tempCashirCart };
  }

  if (action.type === 'REMOVE') {
    let tempCashirCart = state.cashirCart.filter(
      (cashirCartItem) => cashirCartItem._id !== action.payload
    );

    return { ...state, cashirCart: tempCashirCart };
  }

  if (action.type === 'GET_TOTAL') {
    let { totalPrice } = state.cashirCart.reduce(
      (accumulator, cashirCartItem) => {
        const { sellPrice, amount } = cashirCartItem;
        const subPrice = sellPrice * amount;
        accumulator.totalPrice = accumulator.totalPrice + subPrice;
        return accumulator;
      },
      { totalPrice: 0 }
    );

    return { ...state, chashirTotal: totalPrice };
  }

  throw new Error('no matching action type');
};

export default cashirReducer;
