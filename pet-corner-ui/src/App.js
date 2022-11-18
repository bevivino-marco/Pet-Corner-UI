import React  from 'react';
import './App.css';
import Adopt from './adopt/adopt';
import { useState, useEffect } from 'react';


  const APIURL="http://localhost:8000/api/v1/animals";
  async function getAnimals(){
    const response = await fetch(APIURL)
    .then(res=> res.json())
    return response;

  }




function App() {
  
  const [animals, setAnimals] = useState([]);
  
  
    async function callApi(){
      const data = await getAnimals();
      setAnimals(data);
      }  



  useEffect(() => {

    callApi();
    return () => {
      
    }
  },[])


  return (
    <>
    <header className='p-3'>
      <div className='container'>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <i>LOGO
            <svg></svg>
          </i>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item"><a  class="nav-link link-dark px-2 active " aria-current="page" >Home</a></li>
            <li className="nav-item"><a  class="nav-link link-dark px-2">Animal sitting</a></li>
            <li className="nav-item"><a  class="nav-link link-dark px-2">Pet threapy</a></li>
            <li className="nav-item"><a  class="nav-link link-dark px-2">Animal training</a></li>
          </ul>
            <i className="bi bi-person-circle"></i>
        </div>
      </div>
    </header>

    <Adopt></Adopt>

  </>
  );
}

export default App;
