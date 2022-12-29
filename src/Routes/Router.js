import { createBrowserRouter } from "react-router-dom";
import BurgerBuilder from "../Components/BurgerBuilder/BurgerBuilder";
import Main from "../Components/Main";
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
        element: <Orders></Orders>
      }
    ]
  }
])

export default router;