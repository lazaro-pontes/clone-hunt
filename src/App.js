import React from 'react';
import Header from './componentes/Header';
import Routes from './routes'
import './style.css'

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Routes></Routes>
    </div>
  );
}

export default App;
