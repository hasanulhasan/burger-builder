import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Controls from '../Controls/Controls';
import Burger from './Burger/Burger';
import Summary from './Summary/Summary';
import { useHistory } from "react-router";
import { unstable_HistoryRouter } from 'react-router-dom';

const INGREDIENT_PRICE = {
  salad: 20,
  cheese: 40,
  meat: 90
}

class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: 'salad', amount: 1 },
      { type: 'cheese', amount: 2 },
      { type: 'meat', amount: 3 }
    ],
    totalPrice: 80,
    modalOpen: false,
    purchasable: false
  }

  updatePurchasable = ingredients => {
    const sum = ingredients.reduce((sum, element) => {
      return sum += element.amount
    }, 0);
    this.setState({ purchasable: sum > 0 })

  }

  addIngredient = type => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    for (let item of ingredients) {
      if (item.type === type) {
        item.amount++
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: newPrice })
    this.updatePurchasable(ingredients)
  }

  removeIngredient = type => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    for (let item of ingredients) {
      if (item.type === type) {
        if (item.amount <= 0) {
          return
        }
        item.amount--
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: newPrice })
    this.updatePurchasable(ingredients)
  }

  toggleMOdal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  handleCheckOut = () => {
    // this.props.history.push('/checkout');
    // const history = unstable_HistoryRouter();
    // history.push("/checkout");
    // let navigate = useNavigate();
    // navigate('/checkout')
    // <NavigatePage ></NavigatePage>
    console.log('checkOut page is under Construction ')
  }

  render() {
    return (
      <div>
        <div className='d-flex flex-md-row flex-column'>
          <Burger ingredients={this.state.ingredients}></Burger>
          <Controls
            ingredientAdded={this.addIngredient}
            ingredientRemove={this.removeIngredient}
            price={this.state.totalPrice}
            toggleModal={this.toggleMOdal}
            purchasable={this.state.purchasable}
          ></Controls>
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.state.totalPrice.toFixed(0)}BDT</h5>
            <Summary ingredients={this.state.ingredients}></Summary>
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.handleCheckOut}>Continue to CheckOut</Button>
            <Button color='secondary' onClick={this.toggleMOdal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
};

export default BurgerBuilder;