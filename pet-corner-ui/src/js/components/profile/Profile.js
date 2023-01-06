import React  from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PetsIcon from '@mui/icons-material/Pets';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { animalsData } from "../../lib/Animals.js";

function Profile() {
    return (
        <>
            <h1>Informazioni personali</h1>
            <div className='profile-info-container'>
                <p><b>Nome:</b> *****</p>
                <p><b>Codice Fiscale:</b> ************</p>
                <p><b>Email:</b> *********</p>
                <p><b>Indirizzo:</b> ********</p>
                <p><b>Città:</b> *********</p>
                <p><b>Paese:</b> *******</p>
            </div>
            <hr className='solid'/>
            <h2>I tuoi animali <PetsIcon /></h2>
            <button className='add-animal-button' title='Aggiungi animale'><AddCircleIcon /> Aggiungi animale</button>  
            <div className='profile-animals-container'>
                {animalsData.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name} />
                            <p>{item.name} {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                        </div>
                    );
                })}                     
            </div>
        </>
    );
}

export default Profile;