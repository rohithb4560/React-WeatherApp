import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [city, setCity] = useState('London');
  const [results, setResults] = useState([]);
  const [country, setCountry] = useState('');
  const [temp, setTemp] = useState();
  const [description, setDescription] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getWeather();
  }, [city]);

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=54c8e1b255dd55df739837f0b6fa27d2`
    );
    const data = await response.json();
    console.log(data);

    setCity(data.name);
    setCountry(data.sys.country);
    setTemp(data.main.temp);
    setDescription(data.weather[0].description);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setCity(search);
  };
  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor: 'rgba(255 ,255, 255 ,0.1)',
        position: 'fixed',
        width: '30vw',
        color: 'black',

        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <form onSubmit={getSearch}>
        <input
          style={{ marginTop: '10px' ,fontSize:'24px'}}
          type="text"
          onChange={handleChange}
          value={search}
        />

        <button style={{fontSize:'24px'}}>Search</button>
      </form>
      <h3>Name: {city}</h3>
      <h3>Country: {country}</h3>
      <h3>Temp:{Math.floor(temp - 273)} C</h3>
      <h3>Description: {description}</h3>
    </div>
  );
}
