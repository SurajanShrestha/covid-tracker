import React,{useState,useEffect} from 'react';
import './Home.css';
import Cases from './Cases';
import Map from './Map';
import VerticalBar from './Chart';

function Home({countriesList,mapCountries}) {
    const [totalInfected,setTotalInfected]=useState('');
    const [newInfected,setNewInfected]=useState('');
    const [totalRecovered,setTotalRecovered]=useState('');
    const [newRecovered,setNewRecovered]=useState('');
    const [totalDeaths,setTotalDeaths]=useState('');
    const [newDeaths,setNewDeaths]=useState('');
    const [highestActiveCountries,setHighestActive]=useState([]);

    const [mapType,setMapType]=useState({
        type: 'infected',
        color: 'royalblue',
        multiplier: 0.05
    });
    const [selected,setSelected]=useState({
        infectedSelect: 'infected-selected',
        recoveredSelect: '',
        deathsSelect: ''
    });
    const [mapCenter,setMapCenter]=useState([36.40287636526935, -40.404493664610776]);

    const changeMapType=(type,color,multiplier)=>{
        setMapType({
            type: type,
            color: color,
            multiplier: multiplier
        });
    };
    const changeSelected=(type)=>{
        if(type==='infected'){
            setSelected({
                infectedSelect: 'infected-selected',
                recoveredSelect: '',
                deathsSelect: ''
            })
        }else if(type==='recovered'){
            setSelected({
                infectedSelect: '',
                recoveredSelect: 'recovered-selected',
                deathsSelect: ''
            })
        }else if(type==='deaths'){
            setSelected({
                infectedSelect: '',
                recoveredSelect: '',
                deathsSelect: 'deaths-selected'
            })
        }
    }

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/all')
        .then(response=>response.json())
        .then((jsonResponse)=>{
            setTotalInfected(jsonResponse.cases);
            setNewInfected(jsonResponse.todayCases);
            setTotalRecovered(jsonResponse.recovered);
            setNewRecovered(jsonResponse.todayRecovered);
            setTotalDeaths(jsonResponse.deaths);
            setNewDeaths(jsonResponse.todayDeaths);
        },(error)=>console.log(error));

        //2nd Fetch
        fetch('https://disease.sh/v3/covid-19/countries?sort=active')
        .then(response=>response.json())
        .then((jsonResponse)=>{
            setHighestActive(jsonResponse.slice(0,10));
        },(error)=>console.log(error));
    },[]);

    const callApi=(event)=>{
        if(event.target.value==="all"){
            fetch('https://disease.sh/v3/covid-19/all')
            .then(response=>response.json())
            .then((jsonResponse)=>{
                setTotalInfected(jsonResponse.cases);
                setNewInfected(jsonResponse.todayCases);
                setTotalRecovered(jsonResponse.recovered);
                setNewRecovered(jsonResponse.todayRecovered);
                setTotalDeaths(jsonResponse.deaths);
                setNewDeaths(jsonResponse.todayDeaths);
            },(error)=>console.log(error.message));    
        }else{
            fetch('https://disease.sh/v3/covid-19/countries/'+event.target.value+'?strict=true')
            .then(response=>response.json())
            .then((jsonResponse)=>{
                setTotalInfected(jsonResponse.cases);
                setNewInfected(jsonResponse.todayCases);
                setTotalRecovered(jsonResponse.recovered);
                setNewRecovered(jsonResponse.todayRecovered);
                setTotalDeaths(jsonResponse.deaths);
                setNewDeaths(jsonResponse.todayDeaths);

                setMapCenter([jsonResponse.countryInfo.lat,jsonResponse.countryInfo.long]);
            },(error)=>console.log(error.message));
        }
    };
    
    return (
        <div className="home container-fluid px-5">
            <div className="row">
                <div className="col-lg-8 mt-3">
                    <header className="header">
                        <div className="header__title-icon">
                            <h1 className="font-weight-bold">Covid Tracker</h1>
                        </div>
                        <div className="header__country-selector">
                            <label htmlFor="country">Select Country: </label>
                            <select id="country" className="header__country-selector__dropdown" onChange={callApi}>
                                <option value="all">Worldwide 🌏</option>
                                {countriesList.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                            </select>
                        </div>
                    </header>
                    
                    <main className="main row">
                            <div className="col-lg-4">
                                <Cases title="Infected" type="infected" totalData={totalInfected} newData={newInfected} changeMapType={changeMapType} selected={selected} changeSelected={changeSelected} />
                            </div>
                            <div className="col-lg-4">
                                <Cases title="Recovered" type="recovered" totalData={totalRecovered} newData={newRecovered} changeMapType={changeMapType} selected={selected} changeSelected={changeSelected} />                    
                            </div>
                            <div className="col-lg-4">
                                <Cases title="Deaths" type="deaths" totalData={totalDeaths} newData={newDeaths} changeMapType={changeMapType} selected={selected} changeSelected={changeSelected} />
                            </div>
                            <div class="main__map-container col-lg-12">
                                <Map mapCountries={mapCountries} mapType={mapType} mapCenter={mapCenter}/>
                            </div>            
                    </main>
                </div>
                <div className="col-lg-4 bg-light pt-3 mt-3">
                    <div className="sidebar">
                    {/*<div className="elfsight-app-611dbc8d-006c-4d72-a28a-b3d4291b690b"></div>*/}
                        <table>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Active Cases</th>
                                </tr>                            
                            </thead>
                            <tbody>
                                {highestActiveCountries.map((items,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{items.country}</td>
                                            <td>{items.active}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="py-5">
                            <VerticalBar />
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Home;
