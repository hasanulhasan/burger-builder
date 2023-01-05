import * as actionTypes from './actionTypes'
const INGREDIENT_PRICE = {
  salad: 20,
  cheese: 40,
  meat: 90
}

const INITIAL_STATE = {
  ingredients: [
    { type: 'salad', amount: 1 },
    { type: 'cheese', amount: 2 },
    { type: 'meat', amount: 3 }
  ],
  orders: [],
  orderErr: false,
  orderLoading: true,
  totalPrice: 80,
  purchasable: false,
  token: null,
  userId: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
  const ingredients = [...state.ingredients];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (let item of ingredients) {
        if (item.type === action.payload) {
          item.amount++
        }
        return {
          ...state,
          ingredients: ingredients,
          totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
        }
      }
      break;
    case actionTypes.REMOVE_INGREDIENT:
      for (let item of ingredients) {
        if (item.type === action.payload) {
          if (item.amount <= 0) {
            return
          }
          item.amount--
        }
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
      }
      break;
    case actionTypes.UPDATE_PURCHASABLE:
      const sum = state.ingredients.reduce((sum, element) => {
        return sum + element.amount;
      }, 0)
      return {
        ...state,
        purchasable: sum > 0
      }
      break;
    case actionTypes.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          { type: 'salad', amount: 1 },
          { type: 'cheese', amount: 2 },
          { type: 'meat', amount: 3 }
        ],
        totalPrice: 80,
        purchasable: false
      }
      break;
    case actionTypes.LOAD_ORDERS:
      let orders = [];
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key
        })
      }
      return {
        ...state,
        orders: orders,
        orderLoading: false

      }
      break;
    case actionTypes.ORDER_LOAD_FAILED:
      return {
        ...state,
        orderErr: true,
        orderLoading: false
      }
      break;
    //auth case
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }

    default:
      return state
      break;
  }
}