import {
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
  IconButton,
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useState } from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import Login from './auth/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './general_component/Navbar';
import Home from './home_page/Home';
import Loading from './general_component/loading';
import Error from './general_component/Error';
import CartNav from './cart_Page/cart';
import BarcodeScanner from './general_component/barcodeReader';
import Product from './product_page/products';
import CartPage from './cart_Page/CartPage';
import SingleProductPage from './singleProduct_Page/singleProduct_page';

import './app.css';
import CreateProduct from './manageProducts/createProduct';
import Register from './auth/register';
import RegisterSpecialUser from './auth/registerSpecialUser';
import TestComponent from './general_component/testComponent';
import UserInfo from './userManagment/usersInformation';

import CurrentUserInfo from './userManagment/CurrentUser';
import AllProductInformation from './manageProducts/AllProductsInfo';
import SingleProductInformation from './manageProducts/SinglePrdouctInformation';
import UpdateProduct from './manageProducts/updateProduct';
import PurchasePage from './managePurchases/purchasePage';
import CreatePurchasePage from './managePurchases/createPurchase';
import UpdatePurchase from './managePurchases/updatePurchase';
import Recepit_instrument_page from './manage_receipt_instrument/recepit_instrument_page';
import Create_recepit_instrument_Page from './manage_receipt_instrument/create_recepit_instrument';
import Update_recepit_instrument_Page from './manage_receipt_instrument/update_recepit_Instrument';
import OrdersPage from './manageOrders/orders_Page';
import SingleOrderProductsDetails from './manageOrders/singleOrderProducts';
import TransactionDetailsPage from './manageOrders/transactionDeatils';

import 'chart.js/auto';
import AnalizedSellsPage from './manageOrders/anaLizedSells';
import GetMyOrder from './manageOrders/getMyOrders';
import CashirPage from './manageOrders/cashirOrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/navBar' element={<NavBar />} />
        <Route path='/تسجيل الدخول' element={<Login />} />
        <Route path='/صنع حساب' element={<Register />} />
        <Route path='/صنع حساب خاص' element={<RegisterSpecialUser />} />
        <Route path='/الصفحه الرئيسيه' element={<Home />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/خطأ' element={<Error />} />
        <Route path='/cartNav' element={<CartNav />} />
        <Route path='/barcode' element={<BarcodeScanner />} />
        <Route path='/المنتجات' element={<Product />} />
        <Route path='/عربه التسوق' element={<CartPage />} />
        <Route path='/SingleProductPage/:id' element={<SingleProductPage />} />
        <Route path='/ادخال منتجات' element={<CreateProduct />} />
        <Route path='/test' element={<TestComponent />} />
        <Route path='/معلومات المستخدمين' element={<UserInfo />} />
        <Route path='/معلوماتي' element={<CurrentUserInfo />} />
        <Route path='/معلومات المنتجات' element={<AllProductInformation />} />
        <Route
          path='/singleProductInfo/:productID'
          element={<SingleProductInformation />}
        />
        <Route
          path='/تعديل المنتج/:updateProductID'
          element={<UpdateProduct />}
        />
        <Route path='/معلومات وصولات الشراء' element={<PurchasePage />} />
        <Route path='/ادخال وصل شراء' element={<CreatePurchasePage />} />
        <Route
          path='/تعديل وصل شراء/:updatepurchaseID'
          element={<UpdatePurchase />}
        />
        <Route
          path='/معلومات وصولات القبض'
          element={<Recepit_instrument_page />}
        />
        <Route
          path='/ادخال وصل قبض'
          element={<Create_recepit_instrument_Page />}
        />
        <Route
          path='/تعديل وصل قبض/:update_recepit_instrument_ID'
          element={<Update_recepit_instrument_Page />}
        />
        <Route path='/صفحة المبيعات' element={<OrdersPage />} />
        <Route
          path='معلومات المبيعات/:orderID'
          element={<SingleOrderProductsDetails />}
        />
        <Route
          path='/معلومات عمليه نقل الاموال/:transactionID'
          element={<TransactionDetailsPage />}
        />
        <Route path='/تقرير المبيعات' element={<AnalizedSellsPage />} />
        <Route path='/مشترياتي' element={<GetMyOrder />} />
        {<Route path='/صفحة الكاشير' element={<CashirPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
