import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import MaleIcon from "@mui/icons-material/Male";
import callAjax from "../../lib/Ajax";
import SearchIcon from "@mui/icons-material/Search";
import FemaleIcon from "@mui/icons-material/Female";
import {
  compareByAgeAsc,
  compareByAgeDesc,
  compareByDimAscAnimal,
  compareByDimDescAnimal,
  getAnimalImage,
} from "../../lib/Common.js";

function Adopt() {
  const [animalAdoptLoaded, setAnimalAdoptLoaded] = React.useState(false);
  const [animalsAdopt, setAnimalsAdopt] = React.useState([]);

  const [localityLoaded, setLocalityLoaded] = React.useState(false);
  const [locality, setLocality] = React.useState([]);

  const [currentFilter, setCurrentFilters] = React.useState("0");
  const [currentOrder, setCurrentOrder] = React.useState("1");

  const ref_min_age = React.createRef();
  const ref_max_age = React.createRef();
  const ref_min_dim = React.createRef();
  const ref_max_dim = React.createRef();
  const ref_place = React.createRef();

  React.useEffect(() => {
    getAnimalsAdopt();
    getLocality();
  }, []);

  React.useEffect(() => {
    var tmp = animalsAdopt.map((a) => {
      return { ...a };
    });

    if (currentOrder === "1") tmp.sort(compareByAgeAsc);
    if (currentOrder === "2") tmp.sort(compareByAgeDesc);
    if (currentOrder === "3") tmp.sort(compareByDimAscAnimal);
    if (currentOrder === "4") tmp.sort(compareByDimDescAnimal);

    setAnimalsAdopt(tmp);
  }, [currentOrder]);

  function getLocality() {
    var headers = {
      Authorization: sessionStorage.access_token
        ? sessionStorage.access_token
        : null,
    };

    let options = {
      headers: headers,
      type: "get",
      url: `http://localhost:8765/adopt/v2/animals/provenances`,
      dataType: null,
      cache: false,
      data: null,
      processData: false,
      contentType: false,
      success: function(response) {
        var tmp = [];
        if (response)
          response.map((locality) => {
            return tmp.push(locality);
          });
        setLocality(tmp);
        setLocalityLoaded(true);
      },
    };
    callAjax(options);
  }

  function getAnimalsAdopt() {
    var headers = {
      Authorization: sessionStorage.access_token
        ? sessionStorage.access_token
        : null,
    };

    let options = {
      headers: headers,
      type: "get",
      url: `http://localhost:8765/adopt/v2/animals`,
      dataType: null,
      cache: false,
      data: null,
      processData: false,
      contentType: false,
      success: function(response) {
        var tmp = [];
        if (response)
          response.map((animalAdopt) => {
            return tmp.push(animalAdopt);
          });
        tmp.sort(compareByAgeAsc);
        setAnimalsAdopt(tmp);
        setAnimalAdoptLoaded(true);
      },
    };
    callAjax(options);
  }

  function filterChange(e) {
    setCurrentFilters(e.target.value);
  }

  function searchByAge() {
    let min = ref_min_age.current.value;
    let max = ref_max_age.current.value;

    if (max < min) {
      window.alert("Invalid input!");
      return;
    }

    var headers = {
      Authorization: sessionStorage.access_token
        ? sessionStorage.access_token
        : null,
    };

    let options = {
      headers: headers,
      type: "get",
      url: `http://localhost:8765/adopt/v2/animals/filter/age/${min}/${max}`,
      dataType: null,
      cache: false,
      data: null,
      processData: false,
      contentType: false,
      success: function(res) {
        var tmp = [];
        res.map((trainer) => {
          return tmp.push(trainer);
        });
        setAnimalsAdopt(tmp);
        setAnimalAdoptLoaded(true);
      },
    };
    callAjax(options);
  }

  function searchByDim() {
    let min = ref_min_dim.current.value;
    let max = ref_max_dim.current.value;

    if (max < min) {
      window.alert("Invalid input!");
      return;
    }

    var headers = {
      Authorization: sessionStorage.access_token
        ? sessionStorage.access_token
        : null,
    };

    let options = {
      headers: headers,
      type: "get",
      url: `http://localhost:8765/adopt/v2/animals/filter/size/${min}/${max}`,
      dataType: null,
      cache: false,
      data: null,
      processData: false,
      contentType: false,
      success: function(res) {
        var tmp = [];
        res.map((trainer) => {
          return tmp.push(trainer);
        });
        setAnimalsAdopt(tmp);
        setAnimalAdoptLoaded(true);
      },
    };
    callAjax(options);
  }

  function searchByPlace() {
    let place = ref_place.current.value;

    var headers = {
      Authorization: sessionStorage.access_token
        ? sessionStorage.access_token
        : null,
    };

    let options = {
      headers: headers,
      type: "get",
      url: `http://localhost:8765/adopt/v2/animals/provenance/${place}`,
      dataType: null,
      cache: false,
      data: null,
      processData: false,
      contentType: false,
      success: function(res) {
        var tmp = [];
        res.map((trainer) => {
          return tmp.push(trainer);
        });
        setAnimalsAdopt(tmp);
        setAnimalAdoptLoaded(true);
      },
    };
    callAjax(options);
  }

  function orderChange(e) {
    setCurrentOrder(e.target.value);
  }

  return (
    <>
      <div className="filters-containers">
        <div>
          <label>Ordina per</label>
          <select id="orderBy" name="orderBy" onChange={orderChange}>
            <option value="1">Età crescente</option>
            <option value="2">Età decrescente</option>
            <option value="3">Dimensione crescente</option>
            <option value="4">Dimensione decrescente</option>
          </select>
        </div>
        <div>
          <label>Filtra per</label>
          <select onChange={filterChange}>
            <option value="0"></option>
            <option value="1">Età</option>
            <option value="2">Dimensione</option>
            <option value="3">Località</option>
          </select>
        </div>
        {currentFilter === "1" && (
          <div className="age-filter">
            <label>Età minima</label>
            <input
              type="number"
              id="age-min"
              name="quantity"
              min="15"
              max="99"
              ref={ref_min_age}
            />
            <label>Età massima</label>
            <input
              type="number"
              id="age-max"
              name="quantity"
              min="15"
              max="99"
              ref={ref_max_age}
            />
            <button className="btn btn-outline-dark" onClick={searchByAge}>
              <SearchIcon /> Cerca
            </button>
          </div>
        )}
        {currentFilter === "2" && (
          <div className="filter-dimensions">
            <label>Dimensione minima</label>
            <select id="dim-min" name="quantity" ref={ref_min_dim}>
              <option value="1">Piccola</option>
              <option value="2">Media</option>
              <option value="3">Grande</option>
            </select>
            <label>Dimensione massima</label>
            <select id="dim-max" name="quantity" ref={ref_max_dim}>
              <option value="1">Piccola</option>
              <option value="2">Media</option>
              <option value="3">Grande</option>
            </select>
            <button className="btn btn-outline-dark" onClick={searchByDim}>
              <SearchIcon /> Cerca
            </button>
          </div>
        )}
        {currentFilter === "3" && (
          <div>
            <label>Località</label>
            {localityLoaded && (
              <select name="locality" ref={ref_place}>
                {locality.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
            <button className="btn btn-outline-dark" onClick={searchByPlace}>
              <SearchIcon /> Cerca
            </button>
          </div>
        )}
      </div>
      <hr className="solid" />
      <h2>
        Tutti gli animali da adottare <PetsIcon />
      </h2>
      {animalAdoptLoaded && (
        <div className="profile-animals-container">
          {animalsAdopt.map((item) => {
            return (
              <div key={item.id} className="animal-box">
                <img src={getAnimalImage(item.type)} alt={item.name} />
                <p>
                  {item.name} {item.sex === "M" ? <MaleIcon /> : <FemaleIcon />}
                </p>
                <p>{item.age} years </p>
                <p className="description">
                  <a href={`mailto:${item.owner}`}>{item.owner}</a>
                </p>
                <p className="description">
                  <em>{item.description}</em>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Adopt;
