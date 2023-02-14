import React  from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PetsIcon from '@mui/icons-material/Pets';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import callAjax from '../../lib/Ajax';

function Profile({username}) {

    const [profileLoaded, setProfileLoaded] = React.useState(false);
    const [name, setName] = React.useState('');
    const [CF, setCF] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
 
    const [animalLoaded, setAnimalLoaded] = React.useState(false);
    const [animals, setAnimals] = React.useState([]);

    const [animalTherapyLoaded, setAnimalTherapyLoaded] = React.useState(false);
    const [animalsTherapy, setAnimalsTherapy] = React.useState([]);



    React.useEffect(() => {
        getInfoUser();
        getAnimalsUser();        
    },[]);

    function getInfoUser(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }
        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/profile/v2/user-info/${username}`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {  
                setName(response.name);
                setEmail(response.username);
                setAddress(response.address);
                setCF(response.cod_fisc);
                setCity(response.city);
                setCountry(response.country);  
                setProfileLoaded(true);                
            }
        };
        callAjax(options);
    }

    function getAnimalsUser(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/adopt/v2/animals/owner/${username}`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {
                var tmp = [];
                response.map(animal => {                    
                    return tmp.push(animal);
                });
                setAnimals(tmp);
                setAnimalLoaded(true);                
            }
        };
        callAjax(options);
    }

    function addAnimal(){

    let name = prompt("Come si chiama il tuo animale?", "");
    let owner = email;    
    let age = prompt("Quanti anni ha il tuo animale?", "1");
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
        url: `http://localhost:8765/profile/v2/animal/add-animal-queue`,        
        dataType: "json",
        cache: false,        
        data: JSON.stringify({
            name: name, 
            owner: owner,
            age: age,
            size: size,
            type: razza,
            provenance: provenance,
            description: description
        }),        
        processData: false,
        contentType: false,        
        success: function (response) {
            console.log("Animale aggiunto");
        }
    };
    callAjax(options);
}

    function removeAnimal(id){
        var headers = { 
            'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animal/delete-animal-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                id: id                
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                getAnimalsUser();         
            }
        };
        callAjax(options);
    }

    function getAnimalsTherapy(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/therapy/v2/animalsTherapy/owner/${username}`,
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
                description: description,
                owner: {username}
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
            <h1>Informazioni personali</h1>
            {profileLoaded && <div className='profile-info-container'>
                <p><b>Nome:</b> {name}</p>
                <p><b>Codice Fiscale:</b> {CF}</p>
                <p><b>Email:</b> {email}</p>
                <p><b>Indirizzo:</b> {address} </p>
                <p><b>Città:</b> {city} </p>
                <p><b>Paese:</b> {country} </p>
                <button>Iscriviti come pet sitter</button>
                <button>Iscriviti come pet trainer</button>
            </div>}
            <hr className='solid'/>
            <h2>I tuoi animali da adottare<PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale' onClick={() => addAnimal()}><AddCircleIcon /> Aggiungi animale da adottare</button>
            {animalLoaded && <div className='profile-animals-container'>
                {animals.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name} />
                            <p>{item.name} {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                            <button className='remove-animal-button' title='Rimuovi animale' onClick={() => removeAnimal(item.id)}><RemoveCircleIcon /></button>
                        </div>
                    );
                })}
            </div>}
            <hr className='solid'/>
            <h2>I tuoi animali da terapia<PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale da terapia' onClick={() => addAnimalTherapy()}><AddCircleIcon /> Aggiungi animale da terapia</button>
            {animalTherapyLoaded && <div className='profile-animals-container'>
                {animalsTherapy.map(itemTherapy =>{
                    return (
                        <div key={itemTherapy.id} className="animal-box">
                            <img src={itemTherapy.img} alt={itemTherapy.name}/>
                            <p>{itemTherapy.name} {itemTherapy.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                        </div>
                    );
                })}
            </div>}
        </>
    );
}

export default Profile;