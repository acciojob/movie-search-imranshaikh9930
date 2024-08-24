
import React,{useState,useEffect} from "react";
import './../styles/App.css';


const App = () => {
  const [result,setResult] = useState([]);
  const [input,setInput] = useState("");
  const [error,setError] = useState("");
  const apiKey = "99eb9fd1";

  const handleSearch = (e) => {
    e.preventDefault();

    // Clear previous results and errors
    setResult([]);
    setError("");

    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
      input.trim()
    )}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
         
          setResult(data.Search);
          setError("");
        } else {
         
          setError(data.Error || "An unexpected error occurred.");
          setResult([]); 
        }
      })
      .catch((err) => {
   
        setError(err.message || "An unexpected error occurred.");
        setResult([]); 
      });
  };
  return (
    <div>
      <p>Search Movie</p>
      <form>

      <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
      </form>
      <ul>
      {error && <div className="error">{error}</div>}
      {
        result && result.map((mov,index)=>(
          <li key={index}>
            <h1>{mov.Title}</h1>
            <img src={mov.Poster} alt={mov.title}/>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default App
