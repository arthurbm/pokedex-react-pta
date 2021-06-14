import React from 'react';

import './styles.css';

function PokemonCard({ name, photo, types, abilities, photoBack }) {
  return (
    <>
      <div className="box-pokemon">
        <h2>{name}</h2>
        <img src={photoBack} alt="pokemon_photo" width="150px" />
        <img src={photo} alt="pokemon_photo" width="150px" />
        <div className="proprieties" >
          <div>
            <p>Types</p>
            {types?.map((type) => {
              return (
                <p className="propriety-item">{type}</p>
              );
            })}
          </div>
          <div>
            <p>Abilities</p>
            {abilities?.map((ability) => {
              return (
                <p className="propriety-item" >{ability}</p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
