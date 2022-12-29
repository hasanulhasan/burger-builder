import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

const Burger = (props) => {
  return (
    <div>
      <p>Burger</p>
      <Ingredient type='bread-top'></Ingredient>
      <Ingredient type='bread-cheese'></Ingredient>
      <Ingredient type='bread-salad'></Ingredient>
      <Ingredient type='bread-meat'></Ingredient>
      <Ingredient type='bread-bottom'></Ingredient>
    </div>
  );
};

export default Burger;