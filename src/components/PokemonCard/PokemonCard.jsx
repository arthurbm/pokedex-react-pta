import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import './styles.css';

function PokemonCard({ name }) {
  const [pokemonObjects, setPokemonObjects] = useState([]);
  const [photo, setPhoto] = useState();
  const [types, setTypes] = useState();
  const [abilities, setAbilities] = useState();

  // const callPokemon = async () => {
  //   const allPokemons = await api.get("pokemon?limit=100&offset=200")
  //   console.log(allPokemons.data);

  //   (allPokemons.data).map(async (pokemon) => {
  //     const pokemonLink = await axios.get("")
  //   })
  // }

  const getPokemon = async () => {
    let typesLocal, abilitiesLocal;
    const res = await api.get(`pokemon/${name.toLowerCase()}`);
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

    

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      <div className="box-pokemon">
        <p>Nome: {name}</p>
        <img src={photo} alt="pokemon_photo" />
        <p>Tipo: {types}</p>
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
