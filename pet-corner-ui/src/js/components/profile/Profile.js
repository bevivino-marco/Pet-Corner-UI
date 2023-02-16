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
        getAnimalsTherapy();
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
        let microchip = prompt("che microchip ha il tuo animale?", "");
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
            microchip:microchip,
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
        let microchip = prompt("Che microchip ha il tuo animale da terapia?", "");
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
                microchip: microchip,
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

    function addPetSitter(){

        let age = prompt("Inserisci la tua età", "18");
        let personalDescription = prompt("Inserisci una descrizione che ti rende unico come pet-sitter", "");
        let animalsAllowed = prompt("Inserisci gli animali di cui ti puoi occupare (dividi con un '_')", "");
        let sizeAllowed = prompt("Inserisci la taglia massima degli animali di cui ti puoi occupare", "");

        var headers = {
            'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animalTherapy/add-animalSitter-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                name: name.split(' ').slice(0, -1).join(' '),
                surname: name.split(' ').slice(-1).join(' '),
                age: age,
                locality: {city},
                personalDescription: personalDescription,
                animalsAllowed: animalsAllowed,
                sizeAllowed: sizeAllowed,
                owner: {username}
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Ti sei sottoscritto come pet-sitter");
            }
        };
        callAjax(options);
    }

    function addPetTrainer(){

        let age = prompt("Inserisci la tua età", "18");
        let personalDescription = prompt("Inserisci una descrizione che ti rende unico come pet-sitter", "");
        let animalsAllowed = prompt("Inserisci gli animali di cui ti puoi occupare (dividi con un '_')", "");
        let sizeAllowed = prompt("Inserisci la taglia massima degli animali di cui ti puoi occupare", "");

        var headers = {
            'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animalTherapy/add-animalTrainer-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                name: name.split(' ').slice(0, -1).join(' '),
                surname: name.split(' ').slice(-1).join(' '),
                age: age,
                locality: {city},
                personalDescription: personalDescription,
                animalsAllowed: animalsAllowed,
                sizeAllowed: sizeAllowed,
                owner: {username}
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Ti sei sottoscritto come pet-trainer");
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
                <button className='add-animal-button' title='Iscriviti come pet-sitter' onClick={() => addPetSitter()}><AddCircleIcon /> Iscriviti come pet-sitter</button>
                <button className='add-animal-button' title='Iscriviti come pet-trainer' onClick={() => addPetTrainer()}><AddCircleIcon /> Iscriviti come pet-trainer</button>
            </div>}
            <hr className='solid'/>
            <h2>I tuoi animali da adottare<PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale' onClick={() => addAnimal()}><AddCircleIcon /> Aggiungi animale da adottare</button>
            {animalLoaded && <div className='profile-animals-container'>
                {animals.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name} />
                            <p>{item.name}, {item.age} years, {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                            <p>{item.locality}</p>
                            <p>{item.description}</p>
                            <p>{item.owner}</p>
                            <button className='remove-animal-button' title='Rimuovi animale' onClick={() => removeAnimal(item.id)}><RemoveCircleIcon /></button>
                        </div>
                    );
                })}
            </div>}
            <hr className='solid'/>
            <h2>I tuoi animali da terapia<PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale da terapia' onClick={() => addAnimalTherapy()}><AddCircleIcon /> Aggiungi animale da terapia</button>
            {animalTherapyLoaded && <div className='profile-animals-container'>
                {animalsTherapy.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name} />
                            <p>{item.name}, {item.age} years, {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                            <p>{item.locality}</p>
                            <p>{item.description}</p>
                            <p>{item.owner}</p>
                            <button className='remove-animal-button' title='Rimuovi animale da terapia' onClick={() => removeAnimalTherapy(item.id)}><RemoveCircleIcon /></button>
                        </div>
                    );
                })}
            </div>}
        </>
    );
}

export default Profile;