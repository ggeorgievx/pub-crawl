import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const Layout = (props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </>
);

Layout.propTypes = forbidExtraProps({
  children: PropTypes.element.isRequired
});

export default Layout;
