import axios from "axios";
import { useState, useEffect } from "react";
import scss from "./scss/style.scss";
import React from "react";
import ViewCardscss from "./componentes/ViewCard.scss";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [pokemonList, pokemonListSet] = useState("");
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);
  const [show, setShow] = useState([]);
  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const fetchPokemonList = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20"`)
      .then((data) => {
        const res = data.data.results;
        const promises = res.map((item) => axios.get(item.url));
        axios
          .all(promises)
          .then((res) => {
            const data = res.map((item) => ({
              name: item.data.name,
              species: item.data.species.name,
              img: item.data.sprites.front_default,
              attack: item.data.stats[1].base_stat,
              defense: item.data.stats[2].base_stat,
              type: item.data.types[0].type.name,
            }));
            setPokemon(data);
            // console.log(data);
          })
          .catch((error) => {
            console.log("Error");
          });
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const fetchPokemon = (pokemonName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((data) => {
        const res = {
          name: data.data.name,
          img: data.sprites.front_default,
          species: data.species.name,
          attack: data.data.stats[1].base_stat,
          defense: data.data.stats[2].base_stat,
          type: data.data.types[0].type.name,
        };
        setPokemon(data);
        setError(false);
      })
      .catch((error) => {
        console.log("error");
        setError(true);
      });
  };
  function handeNext() {
    setOffset(offset + 20);
  }

  function handePrevius() {
    if (offset >= 20) {
      setOffset((setOffset) => setOffset - 20);
    }
  }

  const cardClick = (i) => {
   const Card = [
    {
      name : i.name,
      img : i.img,
      defense:i.defense,
      attack:i.attack,
      type:i.type,
      species:i.species,
     
    },
   ] 
      
      setShow(Card)
  };

  return (
    <>
      <header>
        <h1>Pokemon App</h1>
        <input
          type="search"
          placeholder="Search your pokemon"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </header>


      <div className="view">
        {
          show.map(el => {
            
            return (
              <>
              <div className="hero">
               <h1>{el.name}</h1>
               <img src={el.img}></img>
              </div>
              <div className="stats">
                <h3>Attack: {el.attack}</h3>
                <h3>Defense: {el.defense}</h3>
                <h2>Type: {el.type}</h2>
                <h2>Specias: {el.species}</h2>
              </div>
              </>
            )
          })
        }
      </div>
      <div className="wrappe_cards" key={"index"}>

        {loading ? setLoading(true) (
          <h1>Loading...</h1>
        ) : (
          pokemon
            .filter((type) => {
              return search.toLowerCase() === ""
                ? type
                : type.name.toLowerCase().includes(search);
            })
            
            .map((item, index) => {  
              
              return (
                <div
                  className={item.type === "fire" ? "fire" : "card_pokemon"}
                  
                  // className={item.type === "water" ? "water" : "card_pokemon"}
                  key={index}
                  onClick={() => cardClick(item)}
                >
                  <h1>{item.name}</h1>
                  <img src={item.img} />
                  {console.log(item.species)}
                </div>
              );
            })
        )}
      </div>
      <div className="btn_groups">
        <button onClick={handePrevius} disabled={offset === 0}>
          PREVIUS
        </button>
        <button onClick={handeNext}>NEXT</button>
      </div>
    </>
  );
}
export default App;
