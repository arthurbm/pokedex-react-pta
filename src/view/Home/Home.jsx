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

  async function getPokemon() {
    try {
      const response = await api.get(`pokemon/${pokemonName.toLowerCase()}`);
      console.log(response.data);

      const { name, sprites, types, abilities } = response.data;
      const { front_default, back_default } = sprites;

      setPokemonNameRequest(name);
      setPhoto(front_default);
      setPhotoBack(back_default);
      setTypes(types.map(typeObj => typeObj.type.name));
      setAbilities(abilities.map(abilityObj => abilityObj.ability.name));

      setMakeRequest(true);

    } catch(err) {
      console.log(err)
      alert('Pokemon not found');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    getPokemon();
    inputRef.current.focus();
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <img src={logoPokedex} alt="logo_pokedex"/>
      <form onSubmit={handleSubmit} className="input-button-container">
        <input
          type="text"
          placeholder="Escreva o nome do Pokemon"
          ref={inputRef}
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type='submit'>ENTER</button>
      </form>

      {makeRequest && (
        <PokemonCard name={pokemonNameRequest} photo={photo} abilities={abilities} types={types} photoBack={photoBack} />
      )}
    </>
  );
}

export default Home;