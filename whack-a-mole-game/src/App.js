import logo from './logo.svg';
import './App.css';
import Game from './Components/Game/game';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{ marginTop: '2%' }}>Hello, Welcome to Whack-a-Mole Game! Please click on the moles!</p>
        <div className="game-container">
          <h1>Whack-a-Mole Game</h1>
          <p>Click on the moles to score points!</p>
          <Game />
         </div>
      </header>
    </div>
  );
}

export default App;
