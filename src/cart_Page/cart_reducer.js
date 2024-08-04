const CartReducer = (state, action) => {
  if (action.type == 'ADD_ITEM') {
    const exitCartItem = state.cart.find(
      (cartItem) => cartItem.id === action.payload.id
    );

    if (exitCartItem) {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (cartItem.amount < cartItem.inventory) {
            return {
              ...cartItem,
              amount: cartItem.amount + 1,
              subTotal: (cartItem.amount + 1) * cartItem.sellPrice,
            };
          }
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    } else {
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, amount: 1, subTotal: action.payload.sellPrice },
        ],
      };
    }
  }

  if (action.type === 'INCREASE') {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        if (cartItem.amount < cartItem.inventory) {
          return {
            ...cartItem,
            amount: cartItem.amount + 1,
            subTotal: (cartItem.amount + 1) * cartItem.sellPrice,
          };
        } else {
          return cartItem;
        }
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === 'DECREASE') {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          if (cartItem.amount === 1) {
            return null;
          } else {
            return {
              ...cartItem,
              amount: cartItem.amount - 1,
              subTotal: (cartItem.amount - 1) * cartItem.sellPrice,
            };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem !== null);

    return { ...state, cart: tempCart };
  }

  if (action.type === 'REMOVE') {
    let tempCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );

    return { ...state, cart: tempCart };
  }

  if (action.type === 'GET_TOTAL') {
    let { totalPrice } = state.cart.reduce(
      (accumulator, cartItem) => {
        const { sellPrice, amount } = cartItem;
        const subPrice = sellPrice * amount;
        accumulator.totalPrice = accumulator.totalPrice + subPrice;
        return accumulator;
      },
      { totalPrice: 0 }
    );

    return { ...state, cartTotal: totalPrice };
  }

  throw new Error('no matching action type');
};

export default CartReducer;
