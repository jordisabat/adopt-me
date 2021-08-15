import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, updatePets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestsPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestsPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();

    updatePets(json.pets);
  }

  function updateLocation(e) {
    setLocation(e.target.value);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestsPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={updateLocation}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
};

export default SearchParams;
