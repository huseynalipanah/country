import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  useEffect(() => {
    async function apiProducts() {
      let api = await fetch("https://restcountries.com/v3.1/all");
      let apijson = await api.json();
      setData(apijson);
      // console.log(apijson);
    }
    apiProducts();
  }, []);

  return (
    <div className="App">
    <nav>
        <span className="where">
          Where in the world?
        </span>
        <a href=""><i class="fa-regular fa-moon fa-fw"></i>Dark Mode</a>
      </nav>
      <div className="search">
        <input type="text" value={search} onChange={ e => setSearch(e.target.value)}/>
      </div>
        <div className="cards">
      {data.filter((x) => x.name.common.toLowerCase().includes(search.toLowerCase()))
      .map((x) => (
        <div key={uuidv4()} className="country">
          <img src={x.flags.png} alt="" />
          <div className="about">
            <h3>{x.name.common}</h3>
            <div className="stats">
            <p>Population: <span>{x.population}</span></p>
            <p>Region: <span>{x.region}</span></p>
            <p>Capital: <span>{x.capital}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
