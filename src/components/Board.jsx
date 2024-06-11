import { useState, useEffect } from 'react';
import Score from './Score';
import Cards from './Cards';
import Restart from './Restart';
import '../styles/board.css';
const URL = 'https://pokeapi.co/api/v2/pokemon/';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function returnCards(pokemon, rearrangeBoard, updateScore) {
  return (
    <>
      {pokemon[0] ? (
        <Cards
          pokemon={pokemon}
          rearrangeBoard={rearrangeBoard}
          updateScore={updateScore}
        ></Cards>
      ) : (
        'Loading'
      )}
    </>
  );
}

export default function Board() {
  const [state, setState] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [offset, setOffset] = useState(randomIntFromInterval(0, 1290));
  const [pokemon, setPokemon] = useState({});
  function rearrangeBoard() {
    setPokemon(shuffleArray([...pokemon]));
  }
  function updateScore(increment) {
    if (increment == 0) {
      setState(false);
    } else {
      setScore(score + increment);
    }
  }

  useEffect(() => {
    async function getPokemon() {
      try {
        let response = await fetch(URL + `?offset=${offset}&limit=12`);
        response = await response.json();
        setPokemon(shuffleArray(response.results));
      } catch (e) {
        console.error(e);
      }
    }
    getPokemon();
  }, [offset]);
  useEffect(() => {
    setBestScore(localStorage.getItem('bestScore'));
  }, []);
  useEffect(() => {
    if (bestScore < score) {
      setBestScore(score);
    }
  }, [score, bestScore]);
  useEffect(() => {
    if (localStorage.getItem('bestScore') < bestScore) {
      localStorage.setItem('bestScore', bestScore);
    }
  }, [bestScore]);
  return (
    <>
      <div className={state ? 'cards' : 'cards hidden'}>
        {returnCards(pokemon, rearrangeBoard, updateScore)}
      </div>
      <Score score={score} bestScore={bestScore}></Score>
      <Restart></Restart>
    </>
  );
}
