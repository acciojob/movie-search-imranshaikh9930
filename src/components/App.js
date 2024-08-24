
import React,{useState,useEffect} from "react";
import './../styles/App.css';

const App = () => {
  const [result,setResult] = useState([]);
  const [input,setInput] = useState("");
  const apiKey = "99eb9fd1";

  const handleSearch = ()=>{
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`;
   fetch(apiUrl)
   .then((res)=>res.json())
   .then((data)=>{
      console.log(data.Search);
    setResult(data.Search)})
    

  }

  return (
    <div>
      <p>Search Movie</p>
      <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
      {
        result && result.map((mov,index)=>(
          <div key={index}>
            <h1>{mov.title}</h1>
            <img src={mov.Poster} alt={mov.title}/>
          </div>
        ))
      }
    </div>
  )
}

export default App
