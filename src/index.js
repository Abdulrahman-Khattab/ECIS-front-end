import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './others/reportWebVitals';
import { ProductProvider } from './product_page/productContext';
import { CartProvider } from './cart_Page/cart_context';
import { SingleProductProvider } from './singleProduct_Page/singleProductContext';
import { CreateProductContextProvider } from './manageProducts/createProductContext';
import { AuthProvider } from './auth/authContext';
import { UserManagmentProvider } from './userManagment/userManagmentContext';
import { PurchaseProvider } from './managePurchases/purchaseContext';
import { Recepit_instrument_Provider } from './manage_receipt_instrument/recepit_Instrument_context';
import { OrderContextProvider } from './manageOrders/ordersContext';
import { CashirContextProvider } from './manageOrders/cashirContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <UserManagmentProvider>
      <PurchaseProvider>
        <Recepit_instrument_Provider>
          <ProductProvider>
            <CartProvider>
              <CashirContextProvider>
                <SingleProductProvider>
                  <CreateProductContextProvider>
                    <OrderContextProvider>
                      <React.StrictMode>
                        <App />
                      </React.StrictMode>
                    </OrderContextProvider>
                  </CreateProductContextProvider>
                </SingleProductProvider>
              </CashirContextProvider>
            </CartProvider>
          </ProductProvider>
        </Recepit_instrument_Provider>
      </PurchaseProvider>
    </UserManagmentProvider>
  </AuthProvider>
);

reportWebVitals();
