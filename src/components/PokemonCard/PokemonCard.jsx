import React from 'react';

import './styles.css';

function PokemonCard({ name, photo, types, abilities }) {
  return (
    <>
      <div className="box-pokemon">
        <p>Nome: {name}</p>
        <img src={photo} alt="pokemon_photo" />
        <p>Type: {types}</p>
        <p>Abilities</p>
        {abilities?.map((ability) => {
          return (
            <p>{ability}</p>
          )
        })}
      </div>
    </>
  );
}

export default PokemonCard;
