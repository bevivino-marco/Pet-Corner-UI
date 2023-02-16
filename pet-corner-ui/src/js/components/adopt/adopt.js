import React  from 'react';
import PetsIcon from "@mui/icons-material/Pets";
import MaleIcon from "@mui/icons-material/Male";
import callAjax from "../../lib/Ajax";
import SearchIcon from '@mui/icons-material/Search';
import FemaleIcon from "@mui/icons-material/Female";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Adopt() {

    const [animalAdoptLoaded, setAnimalAdoptLoaded] = React.useState(false);
    const [animalsAdopt, setAnimalsAdopt] = React.useState([]);

    const [localityLoaded, setLocalityLoaded] = React.useState(false);
    const [locality, setLocality] = React.useState([])

    React.useEffect(() => {
        getAnimalsAdopt();
        getLocality();
    },[]);

    function getLocality(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/adopt/v2/animals/provenances`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {
                var tmp = [];
                response.map(locality => {
                    return tmp.push(locality);
                });
                setLocality(tmp);
                setLocalityLoaded(true);
            }
        };
        callAjax(options);
    }

    function getAnimalsAdopt(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/adopt/v2/animals`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {
                var tmp = [];
                response.map(animalAdopt => {
                    return tmp.push(animalAdopt);
                });
                setAnimalsAdopt(tmp);
                setAnimalAdoptLoaded(true);
            }
        };
        callAjax(options);
    }


    return (
        <>
            <div className='filters-containers'>
                <div>
                    <input className='input-search'></input>
                    <button className='footer-button'><SearchIcon /></button>
                </div>
                <div>
                    <label>Età minima: </label>
                    <input type="number" id="age-min" name="quantity" min="0" max="20"/>
                    <label>Età massima: </label>
                    <input type="number" id="age-max" name="quantity" min="0" max="20" />
                    <button className='footer-button'><ArrowForwardIosIcon /></button>
                </div>
                <div>
                    <label>Dimensione minima: </label>
                    <input type="number" id="dim-min" name="quantity" min="1" max="3"/>
                    <label>Età massima: </label>
                    <input type="number" id="dim-max" name="quantity" min="1" max="3" />
                    <button className='footer-button'><ArrowForwardIosIcon /></button>
                </div>
                <div>
                    <label>Località</label>
                    {localityLoaded && <select name="locality">
                        {locality.map(item =>{
                            return (
                                <option value={item}>{item}</option>
                            );
                        })}
                    </select>}
                    <button className='footer-button'><ArrowForwardIosIcon /></button>
                </div>
                <div>
                    <label>Ordina per</label>
                    <select id="orderBy" name="orderBy">
                        <option value="1">Età crescente</option>
                        <option value="2">Età decrescente</option>
                        <option value="3">Dimensione crescente</option>
                        <option value="4">Dimensione decrescente</option>
                    </select>
                </div>
            </div>
            <hr className='solid'/>
            <h2>Tutti gli animali da adottare <PetsIcon /></h2>
            {animalAdoptLoaded && <div className='profile-animals-container'>
                {animalsAdopt.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name}/>
                            <p>{item.name}, {item.age} years, {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                            <p>{item.locality}</p>
                            <p>{item.description}</p>
                            <p>{item.owner}</p>
                        </div>
                    );
                })}
            </div>}
        </>
    );
}

export default Adopt;