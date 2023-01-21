import React, {useState, createContext, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { TaskPage } from './pages/TaskPage';
import { LoginPage } from './pages/LoginPage';

export const TokenContext = createContext(null); 

const ProtectedRoute = ({element}) => {
  const [token, setToken] = useContext(TokenContext);
  return token ? element() : <Navigate to='/login' />;
} 

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App"> 
      <TokenContext.Provider value={[token, setToken]}>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={TaskPage} />} />
          <Route path="login" element={<LoginPage/>} />
        </Routes>
      </TokenContext.Provider>
    </div>
  )
}

export default App
