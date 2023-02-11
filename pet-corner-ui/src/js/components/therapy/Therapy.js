import React  from 'react';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Therapy() {



    return (
        <>
            <hr className='solid'/>
            <h2>Tutti gli animali da terapia <PetsIcon /></h2>
            <div className='profile-animals-container'>
                        <div className="animal-box">
                            <p><MaleIcon /></p>
                            <button className='remove-animal-button' title='Rimuovi animale' ><RemoveCircleIcon /></button>
                        </div>
                    );
                })}                     
            </div>
        </>
    );
}

export default Therapy;