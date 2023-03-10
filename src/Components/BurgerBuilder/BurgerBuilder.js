import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Controls from '../Controls/Controls';
import Burger from './Burger/Burger';
import Summary from './Summary/Summary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators';

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchasable: () => dispatch(updatePurchasable())
  }
}

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  }

  addIngredient = type => {
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  }

  removeIngredient = type => {
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
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
          <Burger ingredients={this.props.ingredients}></Burger>
          <Controls
            ingredientAdded={this.addIngredient}
            ingredientRemove={this.removeIngredient}
            price={this.props.totalPrice}
            toggleModal={this.toggleMOdal}
            purchasable={this.props.purchasable}
          ></Controls>
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice.toFixed(0)}BDT</h5>
            <Summary ingredients={this.props.ingredients}></Summary>
          </ModalBody>
          <ModalFooter>
            <Link to='/checkout'><Button style={{ backgroundColor: '#D70F64' }} onClick={this.handleCheckOut}>Continue to CheckOut</Button></Link>

            <Button color='secondary' onClick={this.toggleMOdal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);