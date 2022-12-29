import React from 'react';
import { Outlet, Route } from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import CheckOut from './Orders/CheckOut/CheckOut';
import Orders from './Orders/Orders';

const Main = (props) => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;