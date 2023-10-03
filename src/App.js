import React, { useEffect, useState } from "react";
import ParentNodes from "./components/ParentNodes";
import "./styles/App.css";
import { getLocaleAPI } from "./services/api";

function App() {
  const [locales, setLocales] = useState([]);
  const [locale, setLocal] = useState("en_US");

  useEffect(() => {
    // Llamada a la API para obtener el idioma
    getLocaleAPI()
      .then((data) => {
        setLocales(data);
      })
      .catch((error) => console.error("Error fetching locale:", error));
  }, []);

  const handlerChangeLocale = (e) => {
    console.log(e.target.value);
    setLocal(e.target.value);
  };

  return (
    <div className="App">
      <h1>Tree Node Navigation App</h1>

      <label>Select Locale</label>
      <select onChange={(e) => handlerChangeLocale(e)}>
        {locales?.map((locale) => (
          <option key={locale.locale} value={locale.locale}>
            {locale.label}
          </option>
        ))}
      </select>

      <ParentNodes locale={locale} />
    </div>
  );
}

export default App;
