import './App.css';
import React from 'react';
import Main from './components/Main';
import Header from './components/Header';
import  './scss/Header.scss'
import './scss/Hero.scss'
function App() {

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}
export default App;
