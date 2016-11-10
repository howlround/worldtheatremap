import React from 'react';
import Helmet from 'react-helmet';
import MobileMenu from '../components/MobileMenu.jsx';
import Message from '../components/Message.jsx';

const NotFoundPage = () => (
  <div className="page not-found">
    <nav>
      <MobileMenu/>
    </nav>
    <Helmet title="Page Not Found" titleTemplate="%s | World Theatre Map" />
    <Message title="Page not found"/>
  </div>
);

export default NotFoundPage;
