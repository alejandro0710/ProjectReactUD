import logo from './logo.svg';
import './App.css';
import Main from './Main.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Proyecto Jhonny Ramos
        </h2>
        <Main/>
      </header>
    </div>
  );
}

export default App;