import { useState, useEffect, useContext, FunctionComponent } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { PetAPIResponse, Animal, Pet } from "./APIResponseTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  const [location, updateLocation] = useState("");
  const [animal, updateAnimal] = useState("" as Animal);
  const [breed, updateBreed] = useState("");
  const [pets, updatePets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    void requestsPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestsPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = (await res.json()) as PetAPIResponse;

    updatePets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void requestsPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => updateLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value as Animal)}
            onBlur={(e) => updateAnimal(e.target.value as Animal)}
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
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option />
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
};

export default SearchParams;
