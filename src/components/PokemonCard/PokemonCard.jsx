import React from 'react';

import './styles.css';

function PokemonCard({ name, photo, types, abilities, photoBack }) {
  return (
    <>
      <div className="box-pokemon">
        <p>Nome: {name}</p>
        <img src={photoBack} alt="pokemon_photo" />
        <img src={photo} alt="pokemon_photo" />
        <p>Type: {types}</p>
        <p>Abilities</p>
        {abilities?.map((ability) => {
          return (
            <p className="ability-item" >{ability}</p>
          )
        })}
      </div>
    </>
  );
}

export default PokemonCard;
