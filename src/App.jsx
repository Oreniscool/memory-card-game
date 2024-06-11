import Board from './components/Board';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log(
      'Hey there! I hope you liked this game, css is still unfinished including responsiveness. Will get back to fixing it in due time!'
    );
  });
  return (
    <>
      <h1>Pokémon memory card game</h1>
      <Board></Board>
    </>
  );
}

export default App;
