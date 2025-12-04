import React from 'react'; // обязательно для TSX
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import notFoundImg from './assets/img/nofound.jpg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // импорт компонентов маршрутизации

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <div className="error404">
                <img src={notFoundImg} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
