import logo from './logo.svg';
import './App.css';
import Game from './Components/Game/game';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{ marginTop: '2%' }}>Hello, Welcome to Whack-a-Mole Game! Click on the moles to score points!</p>
        <div className="game-container">
          <Game />
         </div>
      </header>
    </div>
  );
}

export default App;
