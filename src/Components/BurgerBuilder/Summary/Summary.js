import React from 'react';

const Summary = (props) => {
  const ingredientSummary = props.ingredients.map(item => {
    return (
      <li key={item.type}>

        <span>{item.type}</span>: {item.amount}

      </li>
    )
  })
  return (
    <div>
      <ul>
        {ingredientSummary}
      </ul>
    </div>
  );
};

export default Summary;