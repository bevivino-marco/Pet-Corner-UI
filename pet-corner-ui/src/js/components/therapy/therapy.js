import React  from 'react';
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MaleIcon from "@mui/icons-material/Male";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import callAjax from "../../lib/Ajax";
import FemaleIcon from "@mui/icons-material/Female";

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
            <div className='row align-items-right' >
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li class="nav-item">
                        <input>
                        </input>
                        <button>SEARCH

                        </button>
                    </li>

                    <li class="nav-item"><i class="bi bi-filter-square "></i>
                        <form action="#">
                            <label htmlFor="lang">Filter</label>
                            <ul>
                                <li>
                                    <label>Min age: </label>
                                    <input type="number" id="quantity" name="quantity" min="0" max="20"/>
                                    <label>Max age: </label>
                                    <input type="number" id="quantity" name="quantity" min="0" max="20" />
                                </li>
                                <li>
                                    <label>Min size: </label>
                                    <input type="number" id="quantity" name="quantity" min="0" max="3" />
                                    <label>Max size: </label>
                                    <input type="number" id="quantity" name="quantity" min="0" max="3" />
                                </li>
                                <li>
                                    <label htmlFor="lang">Provenance</label>
                                    <select name="languages" id="lang">
                                        <option value="javascript">Torino</option>
                                        <option value="php">Milano</option>
                                        <option value="java">Napoli</option>
                                        <option value="golang">Roma</option>
                                    </select>
                                </li>
                            </ul>
                            <input type="submit" value="Submit"/>
                        </form>
                        <i className="bi bi-filter-left"></i>
                    </li>

                    <li class="nav-item ">
                        <form action="#">
                            <label htmlFor="lang">Sort by</label>
                            <select name="languages" id="lang">
                                <option value="javascript">Age increase</option>
                                <option value="php">Age decrease</option>
                                <option value="java">Size increase</option>
                                <option value="golang">Size decrease</option>
                            </select>
                            <input type="submit" value="Submit"/>
                        </form><i class="bi bi-filter-left"></i>
                    </li>
                </ul>
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