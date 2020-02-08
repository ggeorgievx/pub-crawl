import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = (props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
