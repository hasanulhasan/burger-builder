import { BrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import router from './Routes/Router';

function App() {
  return (
    <div className="container">
      <RouterProvider router={router}>
        <Main></Main>
      </RouterProvider>
    </div>
  );
}

export default App;
