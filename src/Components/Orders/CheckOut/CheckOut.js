import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  }
}

class CheckOut extends Component {
  state = {
    values: {
      deliveryAddress: '',
      phone: '',
      paymentTypes: 'Cash On Delivery'
    }
  }

  goBack = () => {
    console.log('go back');
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
    const order = {
      ingredients: this.props.ingredients,
      customer: this.props.values,
      price: this.props.totalPrice,
      orderTime: new Date()
    }
    console.log(order)
    axios.post('https://burger-builder-ac859-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order)
      .then(res => console.log(res))
      .then(err => console.log(err))

  }

  render() {
    return (
      <div>
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
          <textarea name='deliveryAddress' value={this.state.values.deliveryAddress} className='form-control' placeholder='Your Address' onChange={(e) => this.inputChangeHandler(e)}></textarea><br />
          <input name='phone' className='form-control' value={this.state.values.phone} placeholder='Your number' onChange={(e) => this.inputChangeHandler(e)}></input><br />
          <select name='paymentTypes' className='form-control' value={this.state.values.paymentTypes} onChange={(e) => this.inputChangeHandler(e)}>
            <option value='Cash On Delivery'>Cash On Delivery</option>
            <option value='Bkash'>Bkash</option>
          </select><br />
          <Button
            style={{ backgroundColor: '#D70F64' }}
            onClick={this.submitHandler}
            className='mr-auto'>Place Order</Button>
          <Button color='secondary' className='mx-2' onClick={this.goBack}>Cancel</Button>
        </form>
      </div>
    );
  }
};

export default connect(mapStateToProps)(CheckOut);