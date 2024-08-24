import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const apiKey = "99eb9fd1";

  const handleSearch = (e) => {
    e.preventDefault();
    setError(""); // Reset error state before making the request
    setResult([]); // Clear previous results
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`;
    
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          setError(data.Error); // OMDB-specific error message
        } else {
          setResult(data.Search || []);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <p>Search Movie</p>
      <form>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </form>
      <ul>
        {error && <div className="error">{error}</div>}
        {result && result.map((mov, index) => (
          <li key={index}>
            <h1>{mov.Title}</h1>
            <img src={mov.Poster} alt={mov.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
