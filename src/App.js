import React,{useState,useEffect} from 'react';
import Home from './Home';

function App() {
  const [countriesList,setCountriesList]=useState([]);
  const [mapCountries,setMapCountries]=useState([]);
  
  useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/countries')
        .then(response=>response.json())
        .then((jsonResponse)=>{
          console.log(jsonResponse);
            setMapCountries(jsonResponse);
            var countries=jsonResponse.map((item)=>item.country);
            //setCountriesList([...countriesList,countries]);
            setCountriesList(countries);
        },(error)=>console.log(error));
    },[]);

  return (
    <div>
      <Home countriesList={countriesList} mapCountries={mapCountries} />
    </div>
  )
}

export default App;
