import React from 'react';
import NavBar from '../general_component/Navbar';
import Home_body from './home_body';
import Serivces from './service';
import Product_homePage from './product_homePage';
import ProductSector from './product_sectors_home_page';
import Reviews from './reviews';
import Footer_section from './footer_section';
import CartNav from '../cart_Page/cart';
import { useGlobalPrdouctContext } from '../product_page/productContext';

const Home = () => {
  const { data } = useGlobalPrdouctContext();
  return (
    <>
      <NavBar
        pages={['products', 'Pricing', 'Blog', 'potato']}
        settings={['Profile', 'Account', 'Dashboard', 'Logout']}
      />
      <CartNav />
      <Home_body />
      <Serivces />
      <Product_homePage />
      <ProductSector data={data} startSlice={1} endSlice={9} />
      <ProductSector data={data} startSlice={10} endSlice={19} />
      <ProductSector data={data} startSlice={20} endSlice={30} />

      <Footer_section />
    </>
  );
};

export default Home;
