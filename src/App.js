import { useState } from "react";

import Country from "./components/Country";
import data from "./data/countries.json";

import "./styles.css";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function shuffle(a, b) {
  return 0.5 - Math.random();
}

function filter(list, option) {
  if (option === "all") {
    return list;
  } else if (option === "1") {
    return list.filter((item) => item.population < 100000000);
  } else if (option === "100m") {
    return list.filter((item) => item.population >= 100000000);
  } else if (option === "200m") {
    return list.filter((item) => item.population >= 200000000);
  } else if (option === "500m") {
    return list.filter((item) => item.population >= 500000000);
  } else if (option === "1b") {
    return list.filter((item) => item.population >= 1000000000);
  } else {
    return list.filter(function (item) {
      return item.continent.toLowerCase() === option.toLowerCase();
    });
  }
}

// function filter(list, option) {
//   if (option === "all") {
//     return list;
//   } else {
//     return list.filter(function (item) {
//       return item.continent.toLowerCase() === option.toLowerCase();
//     });
//   }
// }

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  const countries = data.countries;

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries() {
    let func;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else if (sortOption === ">") {
      func = descCompare;
    } else if (sortOption === "shuffle") {
      func = shuffle;
    }
    return sort(countries.slice(), func);
  }

  const sortedCountries = sortCountries();

  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <h1>World's Largest Countries by Population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select onChange={handleSort} value={sortOption}>
            <option value="alpha">Alphabetically</option>
            <option value="<">Population in Asc</option>
            <option value=">">Population Dsc</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select onChange={handleFilter} value={filterOption}>
            <optgroup label="By contienet">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By population size">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
