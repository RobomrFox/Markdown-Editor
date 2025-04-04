
import { Provider } from 'jotai';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  console.log('is this working?')

  return (
    <>
    <Provider>

      <BrowserRouter>
        <Routes>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/' element={<HomePage />} />
          
        </Routes>
      </BrowserRouter>
    
    </Provider>
      
    </>
  )
}

export default App
