import React  from 'react';
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MaleIcon from "@mui/icons-material/Male";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import callAjax from "../../lib/Ajax";
import SearchIcon from '@mui/icons-material/Search';
import FemaleIcon from "@mui/icons-material/Female";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Therapy() {

    const [animalTherapyLoaded, setAnimalTherapyLoaded] = React.useState(false);
    const [animalsTherapy, setAnimalsTherapy] = React.useState([]);

    React.useEffect(() => {
        getAnimalsTherapy();
    },[]);

    function getAnimalsTherapy(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/therapy/v2/animalsTherapy`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {
                var tmp = [];
                response.map(animalTherapy => {
                    return tmp.push(animalTherapy);
                });
                setAnimalsTherapy(tmp);
                setAnimalTherapyLoaded(true);
            }
        };
        callAjax(options);
    }

    function addAnimalTherapy(){

        let name = prompt("Come si chiama il tuo animale da terapia?", "");
        let age = prompt("Quanti anni ha il tuo animale da terapia?", "1");
        let razza = prompt("Che animale vuoi inserire?", "1");
        let size = prompt("Quanto è grande il tuo animale?", "1");
        let provenance = prompt("Da dove viene il tuo animale?", "Torino");
        let description = prompt("Inserisci una descrizione del tuo animale", "");

        var headers = {
            'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animalTherapy/add-animalTherapy-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                name: name,
                age: age,
                size: size,
                type: razza,
                provenance: provenance,
                description: description
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Animale da terapia aggiunto");
            }
        };
        callAjax(options);
    }

    function removeAnimalTherapy(id){
        var headers = {
            'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animalTherapy/delete-animalTherapy-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                id: id
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                getAnimalsTherapy();
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
                    <label>Provenienza: </label>
                    <select name="cities">
                        <option value="1">Torino</option>
                        <option value="2">Milano</option>
                        <option value="3">Napoli</option>
                        <option value="4">Roma</option>
                    </select>
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
            <h2>Tutti gli animali da terapia <PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale da terapia' onClick={() => addAnimalTherapy()}><AddCircleIcon /> Aggiungi animale da terapia</button>
            {animalTherapyLoaded && <div className='profile-animals-container'>
                {animalsTherapy.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name}/>
                            <p>{item.name} {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                            <button className='remove-animal-button' title='Rimuovi animale' onClick={() => removeAnimalTherapy(item.id)}><RemoveCircleIcon /></button>
                        </div>
                    );
                })}
            </div>}
        </> 
    );
}

export default Therapy;