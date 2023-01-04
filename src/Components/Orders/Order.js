import React from 'react';

const Order = (props) => {
  const ingredientSummary = props.order.ingredients.map(item => {
    return (
      <span style={{
        border: '1px solid grey',
        boxShadow: '1px 1px #888888',
        borderRadius: '5px',
        padding: '5px',
        marginRight: '10px'
      }} key={item.type}>{item.amount} : {item.type}</span>
    )
  })
  return (
    <div style={{
      border: '1px solid grey',
      boxShadow: '1px 1px #888888',
      borderRadius: '5px',
      padding: '20px',
      marginBottom: '10px'
    }}>
      <h6>Order Number : {props.order.id}</h6>
      {/* <h2>Delivery Address : {props.order.customer.deliveryAddress}</h2> */}
      <hr />
      {ingredientSummary}<hr />
      <p>Total : {props.order.price} BDT</p>
    </div>
  );
};

export default Order;