import { useEffect, useState } from 'react';
import '../styles/cards.css';

function convertHyphenatedSentence(sentence) {
  // Use regex to replace hyphens with spaces
  let normalSentence = sentence.replace(/-/g, ' ');

  // Capitalize the first letter of the sentence
  normalSentence =
    normalSentence.charAt(0).toUpperCase() + normalSentence.slice(1);

  return normalSentence;
}

/* eslint-disable react/prop-types */
function CardImage({ pokemon }) {
  const [imageURL, setImageURL] = useState('');
  useEffect(() => {
    async function getImage() {
      let response = await fetch(pokemon.url);
      response = await response.json();
      setImageURL(response.sprites.other['official-artwork'].front_default);
    }
    getImage();
  }, [pokemon, imageURL]);
  return <img src={imageURL} alt={pokemon.name}></img>;
}
function Card({ pokemon, handleClick }) {
  return (
    <div
      className="card"
      onClick={() => {
        handleClick(pokemon.name);
      }}
    >
      <CardImage pokemon={pokemon}></CardImage>
      <h3>{convertHyphenatedSentence(pokemon.name)}</h3>
    </div>
  );
}
function Cards({ pokemon, rearrangeBoard, updateScore }) {
  const [pokemonClicked, setPokemonClicked] = useState([]);
  function handleClick(pokemonName) {
    rearrangeBoard();
    if (pokemonClicked.includes(pokemonName)) {
      updateScore(0);
    } else {
      setPokemonClicked([...pokemonClicked, pokemonName]);
      updateScore(2);
    }
  }
  return pokemon.map((pokemon_single, index) => {
    return (
      <Card
        pokemon={pokemon_single}
        key={index}
        handleClick={handleClick}
      ></Card>
    );
  });
}
export default Cards;
