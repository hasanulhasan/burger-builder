import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import { store } from './redux/store';
import router from './Routes/Router';

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <RouterProvider router={router}>
          <Main></Main>
        </RouterProvider>
      </Provider>

    </div>
  );
}

export default App;
