import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

import logoPokedex from '../../assets/pokedex-logo.png'
import PokemonCard from '../../components/PokemonCard';

import './styles.css';

function Home() {
  const [pokemonName, setPokemonName] = useState('');
  const [makeRequest, setMakeRequest] = useState(false);

  const [pokemonNameRequest, setPokemonNameRequest] = useState();
  const [photo, setPhoto] = useState();
  const [photoBack, setPhotoBack] = useState();
  const [types, setTypes] = useState();
  const [abilities, setAbilities] = useState();

  const inputRef = useRef();

  const getPokemon = async () => {
    let typesLocal = [];
    let abilitiesLocal = [];
    const res = await api.get(`pokemon/${pokemonName.toLowerCase()}`);
    console.log(res.data);

    setPokemonNameRequest(res.data.name);

    setPhoto(res.data.sprites.front_default);

    setPhotoBack(res.data.sprites.back_default);

    res.data.types.forEach((typeIndex, count) => {
      typesLocal = [...typesLocal, typeIndex.type.name];
    });
    setTypes(typesLocal);

    res.data.abilities.forEach((abilityIndex, count) => {
      abilitiesLocal = [...abilitiesLocal, abilityIndex.ability.name];
    });

    setAbilities(abilitiesLocal);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <img src={logoPokedex} alt=""/>
      <div className="input-button-container">
        <input
          type="text"
          placeholder="Escreva o nome do Pokemon"
          ref={inputRef}
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={() => {setMakeRequest(true); getPokemon()}} >ENTER</button>
      </div>

      {makeRequest && (
        <PokemonCard name={pokemonNameRequest} photo={photo} abilities={abilities} types={types} photoBack={photoBack} />
      )}
    </>
  );
}

export default Home;