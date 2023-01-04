import { createBrowserRouter } from "react-router-dom";
import BurgerBuilder from "../Components/BurgerBuilder/BurgerBuilder";
import Main from "../Components/Main";
import CheckOut from "../Components/Orders/CheckOut/CheckOut";
import Orders from "../Components/Orders/Orders";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <BurgerBuilder></BurgerBuilder>
      },
      {
        path: '/order',
        element: <Orders></Orders>
      },
      {
        path: '/checkout',
        element: <CheckOut></CheckOut>
      }
    ]
  }
])

export default router;