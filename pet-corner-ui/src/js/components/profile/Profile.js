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

    React.useEffect(() => {
        getInfoUser();
        getAnimalsUser();        
    },[]);

    function getInfoUser(){
        let options = {
            headers: null,
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
        
        var headers = { 'Authorization': sessionStorage.token ? sessionStorage.token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/profile/v2/animals/owner/${username}`,
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
        let race = prompt("Che razza è il tuo animale?", "Cane");
        let age = prompt("Quanti hanni ha il tuo animale?", "1");
        let size = prompt("Quanto è grande il tuo animale?", "1");
        let provenence = prompt("Da dove viene il tuo animale?", "Torino");
        let description = prompt("Inserisci una descrizione del tuo animale", "");

        var headers = { 
            'Authorization': sessionStorage.token ? sessionStorage.token : null,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let options = {
            headers: headers,
            type: "post",
            url: `http://localhost:8765/profile/v2/animal/add-animal-queue`,
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                name: name,
                race: race,
                age: age,
                size: size,
                provenence: provenence,
                description: description
            }),
            processData: false,
            contentType: false,
            success: function (response) {
                getAnimalsUser();         
            }
        };
        callAjax(options);
    }

    function removeAnimal(id){
        var headers = { 
            'Authorization': sessionStorage.token ? sessionStorage.token : null,
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
            </div>}
            <hr className='solid'/>
            <h2>I tuoi animali <PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale' onClick={() => addAnimal()}><AddCircleIcon /> Aggiungi animale</button>  
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
        </>
    );
}

export default Profile;