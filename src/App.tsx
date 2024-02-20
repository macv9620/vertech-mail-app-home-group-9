import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeMail } from './pages/HomeMail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = (): JSX.Element => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<HomeMail />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export {App}