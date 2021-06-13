import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import logoPokedex from '../../assets/pokedex-logo.png'
import PokemonCard from '../../components/PokemonCard';

import './styles.css';

function Home() {
  const [pokemomName, setPokemonName] = useState('');
  const [makeRequest, setMakeRequest] = useState(false);

  const [photo, setPhoto] = useState();
  const [types, setTypes] = useState();
  const [abilities, setAbilities] = useState();

  const getPokemon = async () => {
    let typesLocal, abilitiesLocal;
    const res = await api.get(`pokemon/${pokemomName.toLowerCase()}`);
    console.log(res.data);

    setPhoto(res.data.sprites.front_default);

    res.data.types.forEach((typeIndex, count) => {
      if (count === 0) {
        typesLocal = [typeIndex.type.name];
      } else {
        typesLocal = [...typeIndex, typeIndex.type.name];
      }
    });
    setTypes(typesLocal);

    res.data.abilities.forEach((abilityIndex, count) => {
      if (count === 0) {
        abilitiesLocal = [abilityIndex.ability.name];
      } else {
        abilitiesLocal = [...abilitiesLocal, abilityIndex.ability.name];
      }
    });

    setAbilities(abilitiesLocal);
  }

  return (
    <>
      <img src={logoPokedex} alt=""/>
      <div className="input-button-container">
        <input
          type="text"
          value={pokemomName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={() => {setMakeRequest(true); getPokemon()}} >ENTER</button>
      </div>

      {makeRequest && (
        <PokemonCard name={pokemomName} photo={photo} abilities={abilities} types={types} />
      )}
    </>
  );
}

export default Home;