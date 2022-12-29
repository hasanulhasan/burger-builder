import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Burger from './Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: 'bread-salad', amount: 1 },
      { type: 'bread-cheese', amount: 2 },
      { type: 'bread-meat', amount: 3 }
    ]
  }

  addIngredient = type => {
    console.log(type);
    const ingredients = [...this.state.ingredients];
    for (let item of ingredients) {
      if (item.type === type) {
        item.amount++
      }
    }
    this.setState({ ingredients: ingredients })
  }

  removeIngredient = type => {
    console.log(type);
  }

  render() {
    return (
      <div className='d-flex flex-md-row flex-column'>
        <Burger ingredients={this.state.ingredients}></Burger>
        <Controls
          ingredientAdded={this.addIngredient}
          ingredientRemove={this.removeIngredient}
        ></Controls>
      </div>
    )
  }
};

export default BurgerBuilder;