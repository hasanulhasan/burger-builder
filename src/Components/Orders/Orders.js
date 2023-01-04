import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import Order from './Order';
import Spinner from './Spinner/Spinner';

const mapStateToProps = state => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  }
}

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  componentDidUpdate() {
    console.log(this.props.orders)
  }
  render() {
    let orders = null;
    if (!this.props.orderErr) {
      if (this.props.orders.length === 0) {
        orders = <p>You have no orders</p>
      }
      else {
        orders = this.props.orders.map(order => {
          return <Order order={order} key={order.id}></Order>
        })
      }
    }
    else {
      orders = <p style={{
        border: '1px solid grey',
        boxShadow: '1px 1px #888888',
        borderRadius: '5px',
        padding: '5px',
        marginRight: '10px'
      }}>There is a loading problem.</p>
    }
    return (
      <div>
        {/* <Spinner></Spinner> */}
        {this.props.orderLoading ? <Spinner></Spinner> : orders}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);