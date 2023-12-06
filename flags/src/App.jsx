import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";

function App() {
  
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state'i tanımlanıyor

  useEffect(() => {
    async function apiProducts() {
      let api = await fetch("https://restcountries.com/v3.1/all");
      let apijson = await api.json();
      setData(apijson);
      // console.log(apijson);
    }
    apiProducts();
  }, []);

  const myFunction = () => {
    document.body.classList.toggle("dark-mode")
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}> {/* Dark mode state'ine bağlı olarak sınıf adını değiştiriyoruz */}
      <nav>
        <span className="where">Where in the world?</span>
        <a href="#" onClick={myFunction}> {/* Fonksiyonu doğrudan çağırmak yerine referansını geçiyoruz */}
          <i class="fa-regular fa-moon fa-fw"></i>Dark Mode
        </a>
      </nav>
      <div className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country ..."
        />
      </div>
      <div className="cards">
        {data
          .filter((x) =>
            x.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((x) => (
            <div key={uuidv4()} className="country">
              <img src={x.flags.png} alt="" />
              <div className="about">
                <h3>{x.name.common}</h3>
                <div className="stats">
                  <p>
                    Population: <span>{x.population}</span>
                  </p>
                  <p>
                    Region: <span>{x.region}</span>
                  </p>
                  <p>
                    Capital: <span>{x.capital}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
