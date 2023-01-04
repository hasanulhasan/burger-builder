import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { resetIngredients } from '../../../redux/actionCreators';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients)
  }
}

class CheckOut extends Component {
  state = {
    values: {
      deliveryAddress: '',
      phone: '',
      paymentTypes: 'Cash On Delivery'
    },
    isLoading: false,
    isModalOpen: false,
    modalMessage: ''
  }

  goBack = () => {
    console.log('go back is under construction');
  }

  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      }
    })
  }
  submitHandler = () => {
    this.setState({ isLoading: true })
    const order = {
      deliveryAddress: this.props.deliveryAddress,
      ingredients: this.props.ingredients,
      customer: this.props.values,
      price: this.props.totalPrice,
      orderTime: new Date()
    }
    console.log(order)
    axios.post('https://burger-builder-ac859-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: 'Order Successful'
          })
          this.props.resetIngredients();
        }
        else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMessage: 'Something went wrong'
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMessage: 'Error occurred'
        })
      })

  }

  render() {
    return (
      <div>
        <div>
          {this.state.isLoading && <Spinner></Spinner>}
        </div>
        <h4 style={{
          border: '1px solid grey',
          boxShadow: '1px 1px #888888',
          borderRadius: '5px',
          padding: '20px'
        }}> Payment: {this.props.totalPrice} BDT</h4>
        <form style={{
          border: '1px solid grey',
          boxShadow: '1px 1px #888888',
          borderRadius: '5px',
          padding: '20px'
        }}>
          <textarea name='deliveryAddress' value={this.state.values.deliveryAddress} className='form-control' placeholder='Your Address' onChange={(e) => this.inputChangeHandler(e)} required></textarea><br />
          <input name='phone' className='form-control' value={this.state.values.phone} placeholder='Your number' onChange={(e) => this.inputChangeHandler(e)} required></input><br />
          <select name='paymentTypes' className='form-control' value={this.state.values.paymentTypes} onChange={(e) => this.inputChangeHandler(e)} required>
            <option value='Cash On Delivery'>Cash On Delivery</option>
            <option value='Bkash'>Bkash</option>
          </select><br />
          <Button
            style={{ backgroundColor: '#D70F64' }}
            onClick={this.submitHandler}
            className='mr-auto' disabled={!this.props.purchasable}>Place Order</Button>
          <Button color='secondary' className='mx-2' onClick={this.goBack}>Cancel</Button>
        </form>
        {this.state.isModalOpen &&
          <div>
            <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
              <ModalBody>
                <p>{this.state.modalMessage}</p>
                <button onClick={() => this.setState({ isModalOpen: false })}>Close</button>
              </ModalBody>
            </Modal>
          </div>
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);