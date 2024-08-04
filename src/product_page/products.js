import react from 'react';
import { useState, useEffect } from 'react';
import Product_container from './product_container';
import Loading from '../general_component/loading';
import { useGlobalPrdouctContext } from './productContext';
import NavBar from '../general_component/Navbar';
import CartNav from '../cart_Page/cart';
import Footer_section from '../home_page/footer_section';

function Product() {
  const { loading } = useGlobalPrdouctContext();

  //console.log(value);
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <NavBar
        pages={['products', 'Pricing', 'Blog', 'potato']}
        settings={['Profile', 'Account', 'Dashboard', 'Logout']}
      ></NavBar>
      <Product_container></Product_container>
      <CartNav></CartNav>
      <Footer_section />
    </>
  );
}

export default Product;
